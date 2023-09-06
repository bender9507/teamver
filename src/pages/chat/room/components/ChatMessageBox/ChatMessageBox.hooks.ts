import { useQueryClient } from "@tanstack/react-query";
import type { UIEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMount, useUpdateEffect } from "react-use";
import type { ChatMessageData } from "~/states/server/chat";
import { chatKeys, selectMessage, useUpdateMessageReadState } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { useRoomContext } from "../../index.page";

export const useChatMessageBox = () => {
  const [isScrollEnd, setIsScrollEnd] = useState(true);

  const lastMessageRef = useRef<ChatMessageData>();
  const bottomRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const { profile, opponent, roomId, messages } = useRoomContext();
  const { mutate: updateMessageStateMutate } = useUpdateMessageReadState();

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, offsetHeight } = event.currentTarget;

    setIsScrollEnd(scrollHeight - (scrollTop + offsetHeight) < 100);
  };

  const handleScrollToEnd = (behavior?: ScrollBehavior) => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({ behavior });
  };

  useLayoutEffect(() => {
    handleScrollToEnd();
  }, []);

  useUpdateEffect(() => {
    handleScrollToEnd("smooth");
  }, [messages]);

  useEffect(() => {
    updateMessageStateMutate({ roomId, userId: profile.id });
  }, [profile.id, roomId, updateMessageStateMutate]);

  useMount(() => {
    const subscribeRoom = supabase
      .channel("chatRoom")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatMessages",
          filter: `roomId=eq.${roomId}`
        },
        async (payload) => {
          if (payload.new.senderId === profile.id) return;

          const message = await selectMessage(payload.new.id);

          queryClient.setQueryData<ChatMessageData[]>(
            chatKeys.selectChatMessages(Number(roomId)),
            (messages) => {
              if (!messages) return messages;

              return [...messages, message];
            }
          );
        }
      )
      .subscribe();

    return () => {
      subscribeRoom.unsubscribe();
    };
  });

  return {
    isScrollEnd,
    opponent,
    user: profile,
    messages,
    handleScroll,
    handleScrollToEnd,
    bottomRef,
    lastMessageRef
  };
};
