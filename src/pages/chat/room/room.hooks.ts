import { useRouter } from "next/router";
import type { ComponentProps, FormEvent } from "react";
import { useSelectChatRoomQuery } from "~/states/server/chat";
import type ChatRoom from "./index.page";

export const useChatRoom = ({ user }: ComponentProps<typeof ChatRoom>) => {
  const router = useRouter();

  const roomId = router.query.roomId as string;

  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("submit");
  };

  return { chatRoom, handleSendMessage };

  // const { t } = useTranslation("chat");

  // const [messages, setMessages] = useState<ChatMessageRow[]>([]);

  // const { data: profile } = useSelectProfileQuery(userId);

  // const { data: messageData } = useSelectChatMessagesQuery(roomId);

  // const { data: memberData } = useSelectChatRoomsQuery(userId);

  // const { mutateAsync: InsertChatMessageMutateAsync } = useInsertChatMessageMutate();

  // const { mutateAsync: InsertProjectInviteMutateAsync } = useInsertProjectInviteMutate();

  // const { mutateAsync: updateLastReadMessageMutateAsync } = useUpdateLastReadMessageMutate();

  // const currentRoomMember = memberData?.find((room) => room.id === roomId)?.members[0];

  // const memberName = currentRoomMember?.name || "";

  // const memberId = currentRoomMember?.id || "";

  // const memberImageUrl = currentRoomMember?.imageUrl || "";

  // // const formattedMessages = messages.map((message) => {
  // //   const formattedCreatedAt = format(new Date(message.createdAt), timeFormat);
  // //   return { ...message, formattedCreatedAt };
  // // });

  // const formatTime = (timeString: string) => {
  //   const date = new Date(timeString);

  //   let hours = date.getHours();

  //   const minutes = date.getMinutes();

  //   let period = t("오전");

  //   if (hours >= 12) {
  //     period = t("오후");
  //     hours -= 12;
  //   }

  //   if (hours === 0) {
  //     hours = 12;
  //   }

  //   return `${period} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  // };

  // const formattedMessages = messages.map((message) => ({
  //   ...message,
  //   createdAt: formatTime(message.createdAt)
  // }));

  // const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!message.trim()) return;

  //   InsertChatMessageMutateAsync({ senderId: userId, roomId, message });

  //   setMessage("");
  // };

  // const updateLastReadMessage = async (messages: typeof formattedMessages) => {
  //   let lastReadMessageId;

  //   if (messages.length > 0) {
  //     lastReadMessageId = messages[messages.length - 1].id;
  //   }

  //   if (lastReadMessageId) {
  //     await updateLastReadMessageMutateAsync({ userId, roomId, lastReadMessageId });
  //   }
  // };

  // useEffect(() => {
  //   if (messageData) setMessages(messageData);

  //   const subscription = supabase
  //     .channel(`chat:${roomId}`)
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "chatMessages"
  //       },
  //       (payload) => {
  //         const newMessage = payload.new as ChatMessageRow;

  //         if (newMessage.roomId === roomId)
  //           setMessages((oldMessages) => [...oldMessages, newMessage]);
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(subscription);
  //   };
  // }, [roomId, messageData]);

  // useEffect(() => {
  //   updateLastReadMessage(formattedMessages);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formattedMessages.length]);

  // return {
  //   t,
  //   profile,
  //   memberId,
  //   memberName,
  //   memberImageUrl,
  //   formattedMessages,
  //   handleSubmitMessage,
  //   InsertProjectInviteMutateAsync,
  //   updateLastReadMessageMutateAsync
  // };
  return {};
};
