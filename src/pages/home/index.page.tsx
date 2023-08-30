import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Home";
import { useSelectProfileQuery } from "~/states/server/profile";

const Home = (props: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(props.user.id);

  if (profile.role.id === 1) {
    return <Owner {...props} />;
  }

  return <Member {...props} />;
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
