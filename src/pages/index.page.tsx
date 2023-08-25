import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Button, SocialLoginButton } from "~/components/Commons";
import {
  projectsKey,
  selectFollowProjects,
  selectMemberProjects,
  selectOwnerProjects,
  selectProject,
  useSelectFollowProjectsQuery,
  useSelectMemberProjectsQuery,
  useSelectOwnerProjectsQuery,
  useSelectProjectQuery
} from "~/states/server/project";
import { useInsertProjectMutate } from "~/states/server/project/mutations";
import type { Database } from "~/types/database";

const PROJECT_ID = "41";

const sampleData = {
  name: "프로젝트생성테스트13",
  description: "test13",
  imageUrl: "sdfsfgsfhfff",
  recruitCount: "3",
  ownerId: "8a9345fc-bd2c-43a1-8868-99e2c5ed5afe",
  skills: [1, 3],
  projectTypes: [3, 4],
  positions: [2],
  languages: [3, 4, 5]
};

export default function Home() {
  const { t } = useTranslation("common");

  const session = useSession();
  const { data } = useSelectProjectQuery(PROJECT_ID);
  const { data: ownerData } = useSelectOwnerProjectsQuery(session?.user.id);
  const { data: memberData } = useSelectMemberProjectsQuery(session?.user.id);
  const { data: followData } = useSelectFollowProjectsQuery(session?.user.id);
  const { mutate } = useInsertProjectMutate();

  console.log(data);
  console.log(ownerData);
  console.log(memberData);
  console.log(followData);

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
  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectMemberProjects(session?.user.id),
    queryFn: () => selectMemberProjects(session?.user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectFollowProjects(session?.user.id),
    queryFn: () => selectFollowProjects(session?.user.id)
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["common"]))
    }
  };
};
