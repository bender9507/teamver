import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Like";
import { Navbar } from "~/components/Shared";
import {
  profileKeys,
  selectFollows,
  selectProfile,
  useSelectProfileQuery
} from "~/states/server/profile";
import { projectsKey, selectFollowProjects } from "~/states/server/project";
import type { Database } from "~/types/database";

const Like = ({ user }: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <>
      {profile.role.id === 1 ? <Owner userId={user.id} /> : <Member userId={user.id} />}
      <Navbar user={user} />
    </>
  );
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseClient = createPagesServerClient<Database>(ctx);
  const queryClient = new QueryClient();

  const { data } = await supabaseClient.auth.getUser();
  const user = data.user as User;

  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(user.id),
    queryFn: () => selectProfile(user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectFollowProjects(user.id),
    queryFn: () => selectFollowProjects(user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectFollows(user.id),
    queryFn: () => selectFollows(user.id)
  });

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["like"]))
    }
  };
};
