import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconButton } from "~/components/Commons";
import { Member, Owner } from "~/components/Profile";
import { Navbar } from "~/components/Shared";
import { routes } from "~/constants/routes";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeaderWithNav } from "~/styles/mixins";
import * as Styled from "./profile.styles";

const Profile = ({ user }: { user: User }) => {
  const router = useRouter();
  const { data: profile } = useSelectProfileQuery(router.query.userId as string);

  return (
    <LayoutHeaderWithNav>
      <Styled.SettingHeader>
        <Link href={routes.setting}>
          <IconButton name="setting" />
        </Link>
      </Styled.SettingHeader>

      <LayoutContent>
        {profile.role.id === 1 ? <Owner user={user} /> : <Member user={user} />}
      </LayoutContent>

      <Navbar user={user} />
    </LayoutHeaderWithNav>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { user }
  } = (await supabaseServer.auth.getUser()) as { data: { user: User } };

  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(user.id),
    queryFn: () => selectProfile(user.id)
  });

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ["profile"]))
    }
  };
};
