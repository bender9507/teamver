import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Text } from "~/styles/mixins";
import type { Database } from "~/types/database";

const ChatRequest = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  return <Text>{t("채팅 요청")}</Text>;
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
