import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Profile";
import { routes } from "~/constants/routes";
import { useSelectProfileQuery } from "~/states/server/profile";

const Profile = (props: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(props.user.id);

  if (profile.role.id === 1) {
    return <Owner {...props} />;
  }

  return <Member {...props} />;
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabaseServer.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session.user,
      ...(await serverSideTranslations(context.locale, ["memberHome"]))
    }
  };
};
