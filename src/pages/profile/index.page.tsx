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
import { requireAuthentication } from "~/utils";
import * as Styled from "./profile.styles";

const Profile = () => {
  const router = useRouter();
  const { data: profile } = useSelectProfileQuery(router.query.userId as string);

  return (
    <LayoutHeaderWithNav>
      <Styled.SettingHeader>
        <Link href={routes.setting}>
          <IconButton name="setting" />
        </Link>
      </Styled.SettingHeader>

      <LayoutContent>{profile.role.id === 1 ? <Owner /> : <Member />}</LayoutContent>

      <Navbar />
    </LayoutHeaderWithNav>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, [
          "common",
          "profile",
          "project"
        ]))
      }
    };
  }
);
