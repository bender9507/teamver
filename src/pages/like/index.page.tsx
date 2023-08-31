import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Like";
import { routes } from "~/constants/routes";
import {
  profileKeys,
  selectFollows,
  selectProfile,
  useSelectProfileQuery
} from "~/states/server/profile";
import { projectsKey, selectFollowProjects } from "~/states/server/project";
import type { Database } from "~/types/database";

const Like = ({ userId }: { userId: string }) => {
  const { data: profile } = useSelectProfileQuery(userId);

  if (profile.role.id === 1) {
    return <Owner userId={userId} />;
  }
  return <Member userId={userId} />;
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseClient = createPagesServerClient<Database>(ctx);
  const queryClient = new QueryClient();

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(session.user.id),
    queryFn: () => selectProfile(session.user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectFollowProjects(session.user.id),
    queryFn: () => selectFollowProjects(session.user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectFollows(session.user.id),
    queryFn: () => selectFollows(session.user.id)
  });

  return {
    props: {
      userId: session.user.id,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["like"]))
    }
  };
};
