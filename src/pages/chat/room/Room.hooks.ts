import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { ChatMessageData } from "~/states/server/chat";
import { chatKeys, useSelectChatMessagesQuery, useSelectOpponent } from "~/states/server/chat";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { useSelectProfileQuery } from "~/states/server/profile";

export const useRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUser() as User;

  const roomId = router.query.roomId as string;

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: opponent } = useSelectOpponent({ userId: user.id, roomId });
  const { data: messages } = useSelectChatMessagesQuery(Number(roomId));

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

  const values = {
    roomId,
    profile,
    opponent,
    messages,
    addMessage
  };

  return {
    profile,
    values
  };
};
