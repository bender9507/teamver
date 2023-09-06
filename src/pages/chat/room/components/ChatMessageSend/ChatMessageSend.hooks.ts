import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useBoolean } from "~/hooks";
import type { ChatMessageInsert } from "~/states/server/chat";
import { useInsertChatMessageMutate } from "~/states/server/chat";
import { useRoomContext } from "../../index.page";

export const useChatMessageSend = () => {
  const [isOpenEmoji, setIsOpenEmoji] = useBoolean(false);

  const { mount } = useModal();

  const { addMessage, roomId, profile } = useRoomContext();

  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const { mutate: insertChatMessageMutate } = useInsertChatMessageMutate();

  const sendMessage = (message: string, type?: ChatMessageInsert["type"]) => {
    insertChatMessageMutate({ roomId: Number(roomId), senderId: profile.id, message, type });

    addMessage(message, profile, type ?? "MESSAGE");
  };

  const handleSendMessage = handleSubmit(({ message }) => {
    sendMessage(message);

    reset();
  });

  return { handleSendMessage, sendMessage, register, mount, isOpenEmoji, setIsOpenEmoji };
};
