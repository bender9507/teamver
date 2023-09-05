import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TitleHeader } from "~/components/Shared";
import { useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { Member, Owner } from "./components";

const ChatRequest = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);

  const { t } = useTranslation("chat");

  return (
    <LayoutHeader>
      <TitleHeader title={t("채팅요청")} />

      <LayoutContent padding="49px 22px 22px 22px">
        {profile.role.id === 1 ? <Owner /> : <Member />}
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ChatRequest;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["common", "chat"]))
      }
    };
  }
);
