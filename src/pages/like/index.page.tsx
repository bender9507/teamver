import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Member, Owner } from "~/components/Like";
import { routes } from "~/constants/routes";
import { useSelectProfileQuery } from "~/states/server/profile";

const Like = ({ userId }: { userId: string }) => {
  const { data: profile } = useSelectProfileQuery(userId);

  if (profile.role.id === 1) {
    return <Owner userId={userId} />;
  }
  return <Member userId={userId} />;
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseClient = createPagesServerClient(ctx);

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

  return {
    props: {
      userId: session.user.id,
      ...(await serverSideTranslations(ctx.locale, ["like"]))
    }
  };
};
