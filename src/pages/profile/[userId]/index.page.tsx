import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Member, Owner } from "~/components/Profile";
import { Navbar } from "~/components/Shared";
import { useSelectProfileQuery } from "~/states/server/profile";

const Profile = ({ user }: { user: User }) => {
  const router = useRouter();
  const { data: profile } = useSelectProfileQuery(router.query.userId as string);

  return (
    <>
      {profile.role.id === 1 ? <Owner user={user} /> : <Member user={user} />}

      <Navbar user={user} />
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { user }
  } = (await supabaseServer.auth.getUser()) as { data: { user: User } };

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ["profile"]))
    }
  };
};
