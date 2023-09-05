import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import type { UIEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMount, useUpdateEffect } from "react-use";
import type { ChatMessageData, ChatMessageRow } from "~/states/server/chat";
import { useUpdateMessageReadState } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { useRoomContext } from "../../index.page";

export const useChatMessageBox = () => {
  const [isScrollEnd, setIsScrollEnd] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { addMessage, profile, opponent, roomId, messages } = useRoomContext();
  const { t } = useTranslation("chat");

  const { mutate: updateMessageStateMutate } = useUpdateMessageReadState();

  const getIsChaining = (message: ChatMessageData) => {
    const index = messages.findIndex((_message) => _message.id === message.id);

    return messages[index - 1]?.sender.id === message.sender.id;
  };

  const getTime = (date: Date) => {
    const time = dayjs(date);

    const hour = time.hour();

    if (hour < 12) {
      return `${t("오전")} ${time.format("h:mm")}`;
    }

    return `${t("오후")} ${time.format("h:mm")}`;
  };

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
    user: profile,
    messages,
    handleScroll,
    handleScrollToEnd,
    getIsChaining,
    getTime,
    bottomRef
  };
};
