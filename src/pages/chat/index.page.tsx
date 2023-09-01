import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useChatRequestMember, useChatRequestOwner } from "~/components/Chat";
import { Card } from "~/components/Chat/Card";
import { Avatar } from "~/components/Commons";
import { Navbar } from "~/components/Shared";
import { routes } from "~/constants/routes";
import { useSelectProfileQuery } from "~/states/server/profile";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useSelectChatRooms } from "./chat.hooks";
import * as Styled from "./chat.styles";

const Chat = ({ user, roomId }: { user: User; roomId: number }) => {
  const { t } = useTranslation("chat");

  const app = useSelectChatRooms(user.id, roomId);

  const { data: profile } = useSelectProfileQuery(user.id);

  const chatRequestsOwnerApp = useChatRequestOwner(user.id);

  const chatRequestsMemberApp = useChatRequestMember(user.id);

  return (
    <>
      <Head>
        <title>{t("채팅")}</title>
      </Head>

      <>
        <Styled.Container>
          <Styled.ChatListWrapper>
            <Styled.Header>
              <Text size="titleSmall">{t("채팅")}</Text>
            </Styled.Header>

            <FlexColumn>
              {app.invites && app.invites.length > 0 ? (
                <>
                  <Text size="textLarge" style={{ margin: "49px 0 18px" }}>
                    {t("초대 받은 프로젝트")}
                  </Text>
                  <FlexColumn gap={12} style={{ marginBottom: "22px" }}>
                    {app.invites.map((invite) => (
                      <Card key={invite.id} invite={invite} />
                    ))}
                  </FlexColumn>
                </>
              ) : null}
            </FlexColumn>

            <FlexColumn>
              <Flex justify="end">
                <Text
                  size="textMedium"
                  color="primary"
                  style={{ margin: "10px 0 22px 0" }}
                  onClick={app.handleRequestClick}
                >
                  {t("요청 N개", {
                    count:
                      profile.role.id === 1
                        ? chatRequestsOwnerApp.requests.length
                        : chatRequestsMemberApp.requests.length
                  })}
                </Text>
              </Flex>
              <FlexColumn>
                {app.invites && app.invites.length > 0 ? (
                  <Text size="textLarge" style={{ marginBottom: "18px" }}>
                    {t("채팅")}
                  </Text>
                ) : null}
              </FlexColumn>
            </FlexColumn>

            <Styled.ChatRoomsWrapper>
              {app.rooms && app.rooms.length > 0 ? (
                app.rooms.map((room) => (
                  <Link
                    key={room.roomId}
                    href={{ pathname: routes.chatRoom, query: { roomId: room.roomId } }}
                  >
                    <Styled.ChatRoomBox>
                      <Avatar src={room.memberImageUrl} />

                      <FlexColumn justify="around">
                        <Text size="textMediumBold">{room.memberName || t("알 수 없음")}</Text>
                        <Text size="textMedium" color="gray9">
                          {room.lastMessage || t("채팅이 시작되었습니다")}
                        </Text>
                      </FlexColumn>

                      <span>읽지 않은 메세지: {app.unreadMessageCounts || ""}</span>
                    </Styled.ChatRoomBox>
                  </Link>
                ))
              ) : (
                <Text>{t("채팅 목록이 없습니다")}</Text>
              )}
            </Styled.ChatRoomsWrapper>
          </Styled.ChatListWrapper>
        </Styled.Container>
        <Navbar user={user} />
      </>
    </>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const roomId = Number(ctx.params?.roomId);

  return {
    props: {
      user: user as User,
      roomId,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
