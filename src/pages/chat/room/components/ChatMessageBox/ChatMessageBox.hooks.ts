import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { UIEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUpdateEffect } from "react-use";
import type { ChatMessageData } from "~/states/server/chat";
import { useSelectChatMessagesQuery, useUpdateMessageReadState } from "~/states/server/chat";

export const useChatMessageBox = () => {
  const [isScrollEnd, setIsScrollEnd] = useState(true);

  const router = useRouter();
  const user = useUser() as User;
  const { t } = useTranslation("chat");

  const roomId = router.query.roomId as string;

  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: chatMessages } = useSelectChatMessagesQuery(Number(roomId));

  const { mutate: updateMessageStateMutate } = useUpdateMessageReadState();

  const getIsChaining = (message: ChatMessageData) => {
    const index = chatMessages.findIndex((_message) => _message.id === message.id);

    return chatMessages[index - 1]?.sender.id === message.sender.id;
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
  }, [chatMessages]);

  useEffect(() => {
    updateMessageStateMutate({ roomId, userId: user.id });
  }, [chatMessages, roomId, updateMessageStateMutate, user.id]);

  return {
    isScrollEnd,
    user,
    chatMessages,
    handleScroll,
    handleScrollToEnd,
    getIsChaining,
    getTime,
    bottomRef
  };
};
