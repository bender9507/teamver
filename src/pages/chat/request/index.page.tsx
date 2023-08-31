import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChatRequestMember, ChatRequestOwner } from "~/components/Chat";
import { useSelectProfileQuery } from "~/states/server/profile";
import type { Database } from "~/types/database";

const ChatRequest = (props: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(props.user.id);

  if (profile.role.id === 1) {
    return <ChatRequestOwner {...props} />;
  }

  return <ChatRequestMember {...props} />;
};

export default ChatRequest;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
