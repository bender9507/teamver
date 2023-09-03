import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useMount } from "react-use";
import type { ChatMessageData, ChatMessageRow } from "~/states/server/chat";
import { chatKeys, useInsertChatMessageMutate } from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { useSelectProfileQuery, type ProfileAllDataRow } from "~/states/server/profile";
import type { ChatMessageSend } from "./ChatMessageSend";

export const useChatMessageSend = ({ user, opponent }: ComponentProps<typeof ChatMessageSend>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const roomId = router.query.roomId as string;

  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const { data: profile } = useSelectProfileQuery(user.id);

  const { mutate: insertChatMessageMutate } = useInsertChatMessageMutate();

  const addMessage = (message: string, profile: ProfileAllDataRow) => {
    queryClient.setQueryData<ChatMessageData[]>(
      chatKeys.selectChatMessages(Number(roomId)),
      (prevMessage) => {
        if (!prevMessage) return prevMessage;
        const lastMessageId = prevMessage[prevMessage.length - 1]?.id ?? 1;

        return [
          ...prevMessage,
          { id: lastMessageId + 1, message, sender: profile, createdAt: new Date() }
        ];
      }
    );
  };

  const handleSendMessage = handleSubmit(({ message }) => {
    insertChatMessageMutate({ roomId: Number(roomId), senderId: user.id, message });

    addMessage(message, profile);

    reset();
  });

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

          if (newMessage.senderId !== user.id) addMessage(newMessage.message, opponent);
        }
      )
      .subscribe();

    return () => {
      subscribeRoom.unsubscribe();
    };
  });

  return { handleSendMessage, register };
};
