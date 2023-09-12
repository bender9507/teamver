import type { User } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LogoHeader, Navbar } from "~/components/Shared";
import { SwitchCase } from "~/components/Utils";
import { Member, Owner } from "~/pages/home/components";
import { constantKeys, selectConstants } from "~/states/server/constant";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { LayoutHeaderWithNav } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";

const Home = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);
  // 되어라
  return (
    <LayoutHeaderWithNav>
      <LogoHeader role={profile.role.id} />

      <SwitchCase value={profile.role.en} caseBy={{ inviter: <Owner />, invitee: <Member /> }} />

      <Navbar />
    </LayoutHeaderWithNav>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const constant = queryClient.prefetchQuery(constantKeys.selectConstants(), selectConstants);

    const profile = queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );

    await Promise.all([constant, profile]);

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, [
          "common",
          "home",
          "project",
          "profile"
        ]))
      }
    };
  }
);
