import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChatMember, ChatOwner } from "~/components/Chat";
import { TitleHeader } from "~/components/Shared";
import { chatKeys, selectChatRequestMember, selectChatRooms } from "~/states/server/chat";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
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
    </LayoutHeaderWithNav>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = (await supabase.auth.getUser()) as { data: { user: User } };

  const profile = await queryClient.fetchQuery({
    queryKey: profileKeys.selectProfile(user.id),
    queryFn: () => selectProfile(user.id)
  });

  if (profile.role.id === 1) {
    const rooms = queryClient.prefetchQuery({
      queryKey: chatKeys.selectChatRooms(user.id),
      queryFn: () => selectChatRooms(user.id)
    });

    const requestOption = { receiverId: user.id, state: "PENDING" } as const;

    const requests = queryClient.prefetchQuery({
      queryKey: chatKeys.selectChatRequestMember(requestOption),
      queryFn: () => selectChatRequestMember(requestOption)
    });

    await Promise.all([rooms, requests]);
  }

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};
