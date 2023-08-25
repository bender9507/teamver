import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { Button, Input, PreviousButton } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useChatRoom } from "./ChatRoom.hooks";
import * as Styled from "./ChatRoom.styles";

const ChatRoom = ({ user, roomId }: { user: User; roomId: number }) => {
  const { t } = useTranslation("chat");

  const [message, setMessage] = useState("");

  const app = useChatRoom(user.id, roomId, message, setMessage);

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
        {app.messages.map((message) =>
          message.senderId === user.id ? (
            <Styled.ChatMessageRight key={message.id}>{message.message}</Styled.ChatMessageRight>
          ) : (
            <Styled.ChatMessageLeft key={message.id}>{message.message}</Styled.ChatMessageLeft>
          )
        )}
      </Styled.ChatMessageWrapper>

      <Styled.ChatFromWrapper onSubmit={app.handleSubmitMessage}>
        <Input
          type="text"
          style={{ width: 290 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button style={{ color: "white" }}>Send</Button>
      </Styled.ChatFromWrapper>
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

  const roomId = Number(ctx.params?.roomId);

  return {
    props: {
      user: session.user,
      roomId,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
