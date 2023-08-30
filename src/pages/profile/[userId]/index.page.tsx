import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Member, Owner } from "~/components/Profile";
import { useSelectProfileQuery } from "~/states/server/profile";

const Profile = (props: { user: User }) => {
  const router = useRouter();
  const { data: profile } = useSelectProfileQuery(router.query.userId as string);

  if (profile.role.id === 1) {
    return <Owner {...props} />;
  }

  return <Member {...props} />;
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { user }
  } = await supabaseServer.auth.getUser();

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(context.locale, ["profile"]))
    }
  };
};
