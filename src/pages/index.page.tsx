import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Button, SocialLoginButton } from "~/components/Commons";
import {
  useInsertProjectInviteMutate,
  useUpdateProjectMutate
} from "~/states/server/project/mutations";

const sampleData = {
  id: 43,
  skills: [2, 4, 5, 6, 7],
  positions: [2, 3],
  projectTypes: [1, 2],
  languages: [3]
};

const smapleInvite = {
  projectId: 43,
  receiverId: "be95f102-5344-43df-8561-f3f9208c0b3f",
  requesterId: "8a9345fc-bd2c-43a1-8868-99e2c5ed5afe"
};

export default function Home() {
  const { t } = useTranslation("common");

  const { mutate } = useUpdateProjectMutate();
  const { mutate: inviteMutate } = useInsertProjectInviteMutate();

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
