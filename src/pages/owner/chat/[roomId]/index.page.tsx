import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { ChatRoomOut } from "~/components/ChatRoomOut";
import { Avatar, Button, Input, PreviousButton, useDialog } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { ProjectInvite } from "~/components/ProjectInvite";
import { Flex, FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { CHAT_ROOM_OUT_MODAL } from "./ChatRoom.constants";
import { useChatRoom } from "./ChatRoom.hooks";
import * as Styled from "./ChatRoom.styles";

const ChatRoom = ({ user, roomId }: { user: User; roomId: number }) => {
  const [message, setMessage] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);

  const { mount } = useModal();

  const { confirm } = useDialog();

  const app = useChatRoom(user.id, roomId, message, setMessage);

  const handleOpenProjectInviteConfirm = () => {
    confirm({
      title: "어떤 프로젝트에 초대할까요",
      confirmLabel: "초대하기",
      message: <ProjectInvite ownerId={user.id} onProjectSelect={setSelectedProjectId} />
    }).then((confirmed) => {
      if (confirmed && selectedProjectId !== 0) {
        app.InsertProjectInviteMutateAsync({
          projectId: selectedProjectId,
          receiverId: app.memberId,
          requesterId: user.id
        });
      }
    });
  };

  const handleOpenChatRoomOutModal = () => {
    mount(<ChatRoomOut roomId={roomId} userId={user.id} />, { id: CHAT_ROOM_OUT_MODAL });
  };

  return (
    <FlexColumn>
      <Styled.ChatRoomTopBar>
        <FlexCenter gap={15}>
          <PreviousButton />
          <Avatar size="small" src={app.memberImageUrl} />
          <Text>{app.memberName || app.t("알 수 없음")}</Text>
        </FlexCenter>

        <FlexCenter gap={20}>
          <Button onClick={handleOpenProjectInviteConfirm}>{app.t("팀원으로초대하기")}</Button>
          <Button onClick={handleOpenChatRoomOutModal}>{app.t("•••")}</Button>
        </FlexCenter>
      </Styled.ChatRoomTopBar>

      <Styled.ChatMessageWrapper>
        {app.formattedMessages.map((message) =>
          message.senderId === user.id ? (
            <Styled.ChatMessageRight key={message.id}>
              <Text>{message.createdAt}</Text>
              <Text>{message.message}</Text>
            </Styled.ChatMessageRight>
          ) : (
            <Flex key={message.id} align="center" gap={16}>
              <Avatar size="small" src={app.memberImageUrl} />
              <Styled.ChatMessageLeft>{message.message}</Styled.ChatMessageLeft>
              <Text>{message.createdAt}</Text>
            </Flex>
          )
        )}
      </Styled.ChatMessageWrapper>

      <Styled.ChatFromWrapper onSubmit={app.handleSubmitMessage}>
        <Input
          type="text"
          name="message"
          style={{ width: 290 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button>Send</Button>
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
