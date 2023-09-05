import { useForm } from "react-hook-form";
import { useInsertChatMessageMutate } from "~/states/server/chat";
import { useRoomContext } from "../../index.page";

export const useChatMessageSend = () => {
  const { addMessage, roomId, profile } = useRoomContext();

  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const { mutate: insertChatMessageMutate } = useInsertChatMessageMutate();

  const handleSendMessage = handleSubmit(({ message }) => {
    insertChatMessageMutate({ roomId: Number(roomId), senderId: profile.id, message });

    addMessage(message, profile);

    reset();
  });

  return { handleSendMessage, register };
};
