import { useQueryClient } from "@tanstack/react-query";
import type { ChatMessageData } from "~/states/server/chat";
import { chatKeys, useInsertChatMessageMutate } from "~/states/server/chat";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { useRoomContext } from "../../../index.page";

export const useEmojiSend = () => {
  const queryClient = useQueryClient();
  const { data: constants } = useSelectConstantsQuery();
  const { roomId, profile } = useRoomContext();

  const { mutate: insertChatMessageMutate } = useInsertChatMessageMutate({
    onSuccess: (message) => {
      queryClient.setQueryData<ChatMessageData[]>(
        chatKeys.selectChatMessages(Number(roomId)),
        (prevMessage) => {
          if (!prevMessage) return prevMessage;

          return [...prevMessage, message];
        }
      );
    }
  });

  const sendEmoji = (emoji: string) => {
    insertChatMessageMutate({
      roomId: Number(roomId),
      senderId: profile.id,
      message: emoji,
      type: "EMOJI"
    });
  };

  return {
    sendEmoji,
    constants
  };
};
