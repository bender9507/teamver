import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Card } from "~/components/Chat/Card";
import { Avatar } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useSelectChatRooms } from "./chat.hooks";
import * as Styled from "./chat.styles";

const Chat = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const app = useSelectChatRooms(user.id);

  return (
    <>
      <Head>
        <title>{t("채팅")}</title>
      </Head>

      <NavbarLayout>
        <Styled.Header>
          <Text>{t("채팅")}</Text>
        </Styled.Header>

        <Styled.Container>
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
                {t("요청")}
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
                <Styled.ChatRoomBox
                  key={room.roomId}
                  onClick={() => app.handleRoomClick(room.roomId)}
                >
                  <Avatar src={room.memberImageUrl} />

                  <FlexColumn justify="around">
                    <Text size="textMediumBold">{room.memberName || t("알 수 없음")}</Text>
                    <Text size="textMedium" color="gray9">
                      {room.lastMessage || t("채팅이 시작되었습니다")}
                    </Text>
                  </FlexColumn>
                </Styled.ChatRoomBox>
              ))
            ) : (
              <Text>{t("채팅 목록이 없습니다")}</Text>
            )}
          </Styled.ChatRoomsWrapper>
        </Styled.Container>
      </NavbarLayout>
    </>
  );
};

export default Chat;

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

  return {
    props: {
      user: session.user,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
