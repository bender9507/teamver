import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Avatar, IconButton, Input, PreviousButton } from "~/components/Commons";
import { chatKeys, selectChatRoom } from "~/states/server/chat";
import { profileKeys, selectProfile } from "~/states/server/profile";
import {
  Flex,
  FlexColumn,
  LayoutContent,
  LayoutHeaderWithNav,
  PosCenter,
  SizeBox,
  Text
} from "~/styles/mixins";
import type { Database } from "~/types/database";
import { isEmpty } from "~/utils";
import { useChatRoom } from "./room.hooks";
import * as Styled from "./room.styles";

const ChatRoom = ({ user }: { user: User }) => {
  const app = useChatRoom({ user });
  const { t } = useTranslation("chat");

  if (!app.chatRoom) return;

  return (
    <LayoutHeaderWithNav>
      <Styled.ChatHeader>
        <PreviousButton />

        <Flex align="center" flex={1} gap={8}>
          <Avatar size="small" src={app.opponent.imageUrl} />

          <Text>{app.opponent.name}</Text>
        </Flex>

        <Flex gap={21}>
          <IconButton name="invite" />
          <IconButton name="moreVertical" />
        </Flex>
      </Styled.ChatHeader>

      <LayoutContent>
        {isEmpty(app.chatMessages) && (
          <PosCenter>
            <Text as="p" textAlign="center" size="textMediumBold" color="gray6">
              {t("NAME님과 팀원 매칭 되었어요", { name: app.opponent.name })}
            </Text>

            <SizeBox height={24} />

            <Avatar size="xLarge" src={app.opponent.imageUrl} />
          </PosCenter>
        )}

        <FlexColumn gap={10} padding="26px 32px 7px 32px">
          {app.chatMessages.map((messageData) => {
            const isMine = messageData.sender.id === user.id;
            const isChaining = app.getIsChaining(messageData);

            return (
              <Styled.MessageContainer key={messageData.id} isMine={isMine}>
                {!isMine && (
                  <SizeBox height={32} minWidth={32}>
                    {!isChaining && <Avatar size="small" src={messageData.sender.imageUrl} />}
                  </SizeBox>
                )}

                <Styled.MessageBox isMine={isMine}>
                  <Styled.Bubble isMine={isMine}>{messageData.message}</Styled.Bubble>

                  <Text size="textSmall" color="gray6" whiteSpace="nowrap">
                    {app.getTime(messageData.createdAt)}
                  </Text>
                </Styled.MessageBox>
              </Styled.MessageContainer>
            );
          })}
        </FlexColumn>

        <div ref={app.bottomRef} />
      </LayoutContent>

      <Styled.ChatInputBox onSubmit={app.handleSendMessage}>
        <IconButton type="button" name="add" />

        <FlexColumn flex={1}>
          <Input
            color="gray5"
            rightElement={<IconButton type="button" name="smile" />}
            {...app.register("message", { required: true })}
          />
        </FlexColumn>

        <IconButton name="send" />
      </Styled.ChatInputBox>
    </LayoutHeaderWithNav>
  );
};

export default ChatRoom;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const supabase = createPagesServerClient<Database>(ctx);

  const roomId = ctx.query.roomId as string;

  const {
    data: { user }
  } = (await supabase.auth.getUser()) as { data: { user: User } };

  const profile = queryClient.prefetchQuery(profileKeys.selectProfile(user.id), () =>
    selectProfile(user.id)
  );

  const room = queryClient.prefetchQuery(chatKeys.selectChatRoom({ roomId, userId: user.id }), () =>
    selectChatRoom({ roomId, userId: user.id })
  );

  await Promise.all([profile, room]);

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["chat"]))
    }
  };
};
