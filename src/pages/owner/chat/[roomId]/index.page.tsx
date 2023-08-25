import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { Button, PreviousButton } from "~/components/Commons";
import { useSelectChatMessagesQuery } from "~/states/server/chat";
import type { ChatMessageRow } from "~/states/server/chat/types";
import { supabase } from "~/states/server/config";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import * as Styled from "./ChatRoom.styles";

const ChatRoom = ({ user, roomId }: { user: User; roomId: number }) => {
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const { t } = useTranslation("chat");

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

  return (
    <FlexColumn>
      <Styled.ChatRoomTopBar>
        <Flex gap={30}>
          <PreviousButton />
          <Text>상대방이름</Text>
        </Flex>
        <Button style={{ color: "white" }}>{t("팀원으로초대하기")}</Button>
      </Styled.ChatRoomTopBar>

      <Styled.ChatMessageWrapper>
        {messages.map((message) =>
          message.senderId === user.id ? (
            <Styled.ChatMessageRight key={message.id}>{message.message}</Styled.ChatMessageRight>
          ) : (
            <Styled.ChatMessageLeft key={message.id}>{message.message}</Styled.ChatMessageLeft>
          )
        )}
      </Styled.ChatMessageWrapper>
    </FlexColumn>
  );
};

export default ChatRoom;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const roomId = Number(ctx.params?.id);

  return {
    props: {
      user: session.user,
      roomId,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
