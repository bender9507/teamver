import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useRef, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useMount } from "react-use";
import type { ChatMessageData, ChatMessageRow } from "~/states/server/chat";
import {
  chatKeys,
  useInsertChatMessageMutate,
  useSelectChatMessagesQuery,
  useSelectChatRoomQuery,
  useUpdateMessageReadState
} from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { useSelectProfileQuery } from "~/states/server/profile";
import type ChatRoom from "./index.page";

export const useChatRoom = ({ user }: ComponentProps<typeof ChatRoom>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const roomId = router.query.roomId as string;

  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });
  const { data: chatMessages } = useSelectChatMessagesQuery(Number(roomId));

  const { mutate: insertChatMessageMutate } = useInsertChatMessageMutate();
  const { mutate: updateMessageStateMutate } = useUpdateMessageReadState();

  const bottomRef = useRef<HTMLDivElement>(null);

  const opponent = chatRoom.members[0];

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

  const getTime = (date: Date) => {
    const time = dayjs(date);

    const hour = time.hour();

    if (hour < 12) {
      return `오전 ${time.format("h:mm")}`;
    }

    return `오후 ${time.format("h:mm")}`;
  };

  const handleSendMessage = handleSubmit(({ message }) => {
    insertChatMessageMutate({ roomId: Number(roomId), senderId: user.id, message });

    addMessage(message, profile);

    reset();
  });

  const getIsChaining = (message: ChatMessageData) => {
    const index = chatMessages.findIndex((_message) => _message.id === message.id);

    return chatMessages[index - 1]?.sender.id === message.sender.id;
  };

  useMount(() => {
    const subscribeRoom = supabase
      .channel("chatRoom")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatMessages",
          filter: `senderId=neq.${user.id}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessageRow;

          addMessage(newMessage.message, opponent);
        }
      )
      .subscribe();

    return () => {
      subscribeRoom.unsubscribe();
    };
  });

  useEffect(() => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    updateMessageStateMutate({ roomId, userId: user.id });
  }, [roomId, updateMessageStateMutate, user.id]);

  return {
    opponent,
    chatRoom,
    chatMessages,
    bottomRef,
    handleSendMessage,
    register,
    getIsChaining,
    getTime
  };
};
