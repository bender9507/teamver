import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { useSelectChatMessagesQuery, useUpdateMessageReadState } from "~/states/server/chat";

export const useChatMessageBox = () => {
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

  useEffect(() => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    updateMessageStateMutate({ roomId, userId: user.id });
  }, [chatMessages, roomId, updateMessageStateMutate, user.id]);

  return {
    user,
    chatMessages,
    getIsChaining,
    getTime,
    bottomRef
  };
};
