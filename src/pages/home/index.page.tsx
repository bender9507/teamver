import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Home";
import { LogoHeader, Navbar } from "~/components/Shared";
import { useSelectProfileQuery } from "~/states/server/profile";

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
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { user }
  } = await supabaseServer.auth.getUser();

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(context.locale, ["home"]))
    }
  };
};
