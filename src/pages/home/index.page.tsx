import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Home";
import { LogoHeader, Navbar } from "~/components/Shared";
import { constantKeys, selectConstants } from "~/states/server/constant";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";

const Home = ({ user }: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <>
      <LogoHeader />

      {profile.role.id === 1 ? <Owner user={user} /> : <Member user={user} />}

      <Navbar user={user} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { user }
  } = (await supabaseServer.auth.getUser()) as { data: { user: User } };

  const constant = queryClient.prefetchQuery({
    queryKey: constantKeys.selectConstants(),
    queryFn: selectConstants
  });

  const profile = queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(user.id),
    queryFn: () => selectProfile(user.id)
  });

  await Promise.all([constant, profile]);

  return {
    props: {
      user: user as User,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(context.locale, ["home"]))
    }
  };
};
