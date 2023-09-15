import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navbar, TitleHeader } from "~/components/Shared";
import { MetaTag } from "~/components/Shared/MetaTag";
import { SwitchCase } from "~/components/Utils";
import { useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeaderWithNav } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { Member, Owner } from "./components";

const Chat = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);

  const { t } = useTranslation("chat");

  return (
    <LayoutHeaderWithNav>
      <MetaTag title="팀버 채팅" name="description" content="팀버 채팅 페이지" />

      <TitleHeader title={t("채팅")} />

      <LayoutContent padding="0px 22px 22px 22px">
        <SwitchCase value={profile.role.en} caseBy={{ inviter: <Owner />, invitee: <Member /> }} />
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
