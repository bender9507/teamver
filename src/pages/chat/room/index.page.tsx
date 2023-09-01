import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Avatar, IconButton, Input, PreviousButton } from "~/components/Commons";
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

  const { members, messages } = app.chatRoom;

  return (
    <LayoutHeaderWithNav>
      <Styled.ChatHeader>
        <PreviousButton />

        <Flex align="center" flex={1} gap={8}>
          <Avatar size="small" src={members[0].imageUrl} />

          <Text>{members[0].name}</Text>
        </Flex>

        <Flex gap={21}>
          <IconButton name="invite" />
          <IconButton name="moreVertical" />
        </Flex>
      </Styled.ChatHeader>

      <LayoutContent>
        {isEmpty(messages) && (
          <PosCenter>
            <Text as="p" textAlign="center" size="textMediumBold" color="gray6">
              {t("개발하는 NAME님과 팀원 매칭 되었어요", { name: members[0].name })}
            </Text>

            <SizeBox height={24} />

            <Avatar size="xLarge" src={members[0].imageUrl} />
          </PosCenter>
        )}

        {messages.map(() => (
          <div>dd</div>
        ))}
      </LayoutContent>

      <Styled.ChatInputBox onSubmit={app.handleSendMessage}>
        <IconButton type="button" name="add" />

        <FlexColumn flex={1}>
          <Input color="gray5" rightElement={<IconButton type="button" name="smile" />} />
        </FlexColumn>

        <IconButton name="send" />
      </Styled.ChatInputBox>
    </LayoutHeaderWithNav>
  );
};

export default ChatRoom;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(ctx.locale, ["chat"]))
    }
  };
};
