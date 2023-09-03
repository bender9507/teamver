import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChatMember, ChatOwner } from "~/components/Chat";
import { Navbar, TitleHeader } from "~/components/Shared";
import { useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeaderWithNav } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";

const Chat = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);

  const { t } = useTranslation("chat");

  return (
    <LayoutHeaderWithNav>
      <TitleHeader title={t("채팅")} />

      <LayoutContent padding="0px 22px 22px 22px">
        {profile.role.id === 1 ? <ChatOwner /> : <ChatMember />}
      </LayoutContent>

      <Navbar />
    </LayoutHeaderWithNav>
  );
};

export default Chat;

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
