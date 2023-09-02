import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChatMember, ChatOwner } from "~/components/Chat";
import { Navbar, TitleHeader } from "~/components/Shared";
import { useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeaderWithNav } from "~/styles/mixins";
import type { Database } from "~/types/database";

const Chat = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <LayoutHeaderWithNav>
      <TitleHeader title={t("채팅")} />

      <LayoutContent padding="0px 22px 22px 22px">
        {profile.role.id === 1 ? <ChatOwner user={user} /> : <ChatMember user={user} />}
      </LayoutContent>

      <Navbar user={user} />
    </LayoutHeaderWithNav>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = (await supabase.auth.getUser()) as { data: { user: User } };

  return {
    props: {
      user,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
