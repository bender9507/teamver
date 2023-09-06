import type { UIEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMount, useUpdateEffect } from "react-use";
import type { ChatMessageData, ChatMessageRow } from "~/states/server/chat";
import { useUpdateMessageReadState } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { useRoomContext } from "../../index.page";

export const useChatMessageBox = () => {
  const [isScrollEnd, setIsScrollEnd] = useState(true);

  const lastMessageRef = useRef<ChatMessageData>();

  const bottomRef = useRef<HTMLDivElement>(null);

  const { addMessage, profile, opponent, roomId, messages } = useRoomContext();

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
        (payload) => {
          const newMessage = payload.new as ChatMessageRow;

          if (opponent && newMessage.senderId !== profile.id) {
            addMessage(newMessage.message, opponent);
          }
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
