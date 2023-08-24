import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Button, SocialLoginButton } from "~/components/Commons";
import {
  projectsKey,
  selectOwnerProjects,
  selectProject,
  useSelectOwnerProjectsQuery,
  useSelectProjectQuery
} from "~/states/server/project";
import { useInsertProjectMutate } from "~/states/server/project/mutations";
import type { Database } from "~/types/database";

const PROJECT_ID = "41";

const sampleData = {
  name: "프로젝트생성테스트",
  description: "test",
  imageUrl: "sdfsfgsfh",
  recruitCount: "3",
  ownerId: "8a9345fc-bd2c-43a1-8868-99e2c5ed5afe"
};

export default function Home() {
  const { t } = useTranslation("common");

  const session = useSession();
  const { data } = useSelectProjectQuery(PROJECT_ID);
  const { data: ownerData } = useSelectOwnerProjectsQuery(session?.user.id);
  const { mutate } = useInsertProjectMutate();

  console.log(data);
  console.log(ownerData);
  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>
      <SocialLoginButton provider="github" />
      <Button onClick={() => mutate(sampleData)}>mutate</Button>
      coder
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const supabaseClient = createPagesServerClient<Database>(ctx);

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectProject(PROJECT_ID),
    queryFn: () => selectProject(PROJECT_ID)
  });
  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectOwnerProjects(session?.user.id),
    queryFn: () => selectOwnerProjects(session?.user.id)
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
      // ...(await serverSideTranslations(locale, ["common"]))
    }
  };
};
