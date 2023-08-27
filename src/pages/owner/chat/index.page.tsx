import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Avatar, Button } from "~/components/Commons";
import { FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useSelectChatRooms } from "./chat.hooks";
import * as Styled from "./chat.styles";

const Chat = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const app = useSelectChatRooms(user.id);

  return (
    <FlexColumn>
      <FlexCenter>
        <Text>{t("채팅")}</Text>
      </FlexCenter>

      <Styled.ChatRoomsTitleBox>
        <Text>{t("채팅")}</Text>
        <Button onClick={app.handleRequestClick}>{t("요청")}</Button>
      </Styled.ChatRoomsTitleBox>

      <Styled.ChatRoomsWrapper>
        {app.rooms && app.rooms.length > 0 ? (
          app.rooms.map((room) => (
            <Styled.ChatRoomBox key={room.roomId} onClick={() => app.handleRoomClick(room.roomId)}>
              <Avatar src={room.memberImageUrl} />

              <FlexColumn>
                <Text>{room.memberName || t("알 수 없음")}</Text>
                <Text>{room.lastMessage || t("채팅이 시작되었습니다")}</Text>
              </FlexColumn>
            </Styled.ChatRoomBox>
          ))
        ) : (
          <Text>{t("채팅 목록이 없습니다")}</Text>
        )}
      </Styled.ChatRoomsWrapper>
    </FlexColumn>
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
