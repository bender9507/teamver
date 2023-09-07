import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TitleHeader } from "~/components/Shared";
import { projectsKey, selectProject } from "~/states/server/project";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { ProjectForm } from "../components";
import { useEdit } from "./edit.hooks";

const ProjectEdit = () => {
  const app = useEdit();

  const { t } = useTranslation("project");

  return (
    <LayoutHeader>
      <TitleHeader title={t("프로젝트 수정하기")} onPrevious={app.handleBack} />

      <LayoutContent as="form" gap={36} padding="22px" onSubmit={app.handleEditProject}>
        <ProjectForm app={app} isEditMode projectImage={app.project.imageUrl} />
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ProjectEdit;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const { projectId } = context.query;

    await queryClient.prefetchQuery(projectsKey.selectProject(Number(projectId)), () =>
      selectProject(Number(projectId))
    );

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, ["common", "project"]))
      }
    };
  }
);
