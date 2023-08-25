import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { Button } from "~/components/Commons";
import { useSelectChatRoomsQuery } from "~/states/server/chat";
import { FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import * as Styled from "./chat.styles";

const Chat = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  console.log(user);

  const chatRoomQuery = useSelectChatRoomsQuery(user.id);

  useEffect(() => {
    console.log("originalData: ", chatRoomQuery);
  }, [chatRoomQuery]);

  return (
    <FlexColumn align="center">
      <Text color="white">{t("채팅")}</Text>

      <Styled.ChatRoomsWrapper>
        <Text color="white">{t("채팅")}</Text>
        <Button style={{ color: "white" }}>{t("요청")}</Button>
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
