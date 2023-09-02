import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { chatKeys, selectChatRoom } from "~/states/server/chat";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";

import { ChatRoomMember, ChatRoomOwner } from "~/components/Chat";
import type { Database } from "~/types/database";

const ChatRoom = ({ user }: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(user.id);

  return profile.role.id === 1 ? <ChatRoomOwner user={user} /> : <ChatRoomMember user={user} />;
};

export default ChatRoom;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const supabase = createPagesServerClient<Database>(ctx);

  const roomId = ctx.query.roomId as string;

  const {
    data: { user }
  } = (await supabase.auth.getUser()) as { data: { user: User } };

  const profile = queryClient.prefetchQuery(profileKeys.selectProfile(user.id), () =>
    selectProfile(user.id)
  );

  const room = queryClient.prefetchQuery(chatKeys.selectChatRoom({ roomId, userId: user.id }), () =>
    selectChatRoom({ roomId, userId: user.id })
  );

  await Promise.all([profile, room]);

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["chat"]))
    }
  };
};
