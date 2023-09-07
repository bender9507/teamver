import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useBoolean } from "~/hooks";
import type { ChatMessageData } from "~/states/server/chat";
import { chatKeys, useInsertChatMessageMutate } from "~/states/server/chat";
import { useRoomContext } from "../../index.page";

export const useChatMessageSend = () => {
  const [isOpenEmoji, setIsOpenEmoji] = useBoolean(false);

  const queryClient = useQueryClient();
  const { mount } = useModal();
  const { roomId, profile } = useRoomContext();
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

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

  const handleSendMessage = handleSubmit(({ message }) => {
    insertChatMessageMutate({
      roomId: Number(roomId),
      senderId: profile.id,
      message,
      type: "MESSAGE"
    });

    reset();
  });

  return { handleSendMessage, register, mount, isOpenEmoji, setIsOpenEmoji };
};
