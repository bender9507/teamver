import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Avatar, Button, PreviousButton } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useChatRequest } from "./request.hooks";

const ChatRequest = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const app = useChatRequest(user.id);

  return (
    <FlexColumn>
      <Flex justify="between" align="center">
        <PreviousButton />
        <Text>{t("채팅 요청")}</Text>
      </Flex>

      <FlexColumn gap={18}>
        {app.requesters.map((requester) => (
          <Flex key={requester.id} justify="between" align="center">
            <Flex align="center" gap={16}>
              <Avatar src={requester.imageUrl} />
              <Text>{requester.name}</Text>
            </Flex>

            <Flex gap={12}>
              <Button>{t("수락")}</Button>
              <Button>{t("삭제")}</Button>
            </Flex>
          </Flex>
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};

export default ChatRequest;

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
