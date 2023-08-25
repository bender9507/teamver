import { useEffect, useState } from "react";
import { useSelectChatMessagesQuery, useSelectChatRoomsQuery } from "~/states/server/chat";
import type { ChatMessageRow } from "~/states/server/chat/types";
import { supabase } from "~/states/server/config";

export const useChatRoom = (userId: string, roomId: number) => {
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const { data: memberData } = useSelectChatRoomsQuery(userId);
  const { data: messageData } = useSelectChatMessagesQuery(roomId);

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
      if (subscription) subscription.unsubscribe();
      supabase.removeChannel(subscription);
    };
  }, [roomId, messageData]);

  return { messages };
};
