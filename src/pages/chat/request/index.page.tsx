import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChatRequestMember, ChatRequestOwner } from "~/components/Chat";
import { TitleHeader } from "~/components/Shared";
import { useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import type { Database } from "~/types/database";

const ChatRequest = (props: { user: User }) => {
  const { t } = useTranslation("chat");
  const { data: profile } = useSelectProfileQuery(props.user.id);

  return (
    <LayoutHeader>
      <TitleHeader title={t("채팅요청")} />

      <LayoutContent padding="49px 22px 22px 22px">
        {profile.role.id === 1 ? <ChatRequestOwner {...props} /> : <ChatRequestMember {...props} />}
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ChatRequest;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = (await supabase.auth.getUser()) as { data: { user: User } };

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
