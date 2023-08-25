import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Button, SocialLoginButton } from "~/components/Commons";
import type { InviteState } from "~/states/server/project";
import {
  useUpdateProjectInviteStateMutate,
  useUpdateProjectMutate
} from "~/states/server/project/mutations";

const sampleData = {
  id: 43,
  skills: [2, 4, 5, 6, 7],
  positions: [2, 3],
  projectTypes: [1, 2],
  languages: [3]
};

const smapleInvite: { id: number; state: InviteState } = {
  id: 1,
  state: "GRANT"
};

export default function Home() {
  const { t } = useTranslation("common");

  const { mutate } = useUpdateProjectMutate();
  const { mutate: inviteMutate } = useUpdateProjectInviteStateMutate();

  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>
      <SocialLoginButton provider="github" />
      <Button onClick={() => mutate(sampleData)}>mutate</Button>
      <Button onClick={() => inviteMutate(smapleInvite)}>초대</Button>
      coder
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
};
