import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import {
  useInsertChatMessageMutate,
  useSelectChatMessagesQuery,
  useSelectChatRoomsQuery
} from "~/states/server/chat";
import type { ChatMessageRow } from "~/states/server/chat/types";
import { supabase } from "~/states/server/config";

export const useChatRoom = (
  userId: string,
  roomId: number,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const { t } = useTranslation("chat");

  const [messages, setMessages] = useState<ChatMessageRow[]>([]);

  const { data: messageData } = useSelectChatMessagesQuery(roomId);

  const { mutateAsync: InsertChatMessageMutateAsync } = useInsertChatMessageMutate();

  const { data: memberData } = useSelectChatRoomsQuery(userId);

  const memberName = memberData[0].members[0].name;

  const memberImageUrl = memberData[0].members[0].imageUrl;

  // const formattedMessages = messages.map((message) => {
  //   const formattedCreatedAt = format(new Date(message.createdAt), t("timeFormat"));
  //   return { ...message, formattedCreatedAt };
  // });

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let period = "오전";

    if (hours >= 12) {
      period = "오후";
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    return `${period} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const formattedMessages = messages.map((message) => ({
    ...message,
    createdAt: formatTime(message.createdAt)
  }));

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    InsertChatMessageMutateAsync({ senderId: userId, roomId, message });

    setMessage("");
  };

  useEffect(() => {
    if (messageData) setMessages(messageData || []);

    const subscription = supabase
      .channel(`chat:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatMessages"
        },
        (payload) => {
          const newMessage = payload.new as ChatMessageRow;
          setMessages((oldMessages) => [...oldMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId, messageData]);

  return { t, formattedMessages, memberName, memberImageUrl, handleSubmitMessage, memberData };
};
