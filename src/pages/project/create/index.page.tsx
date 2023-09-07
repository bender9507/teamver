import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "react-calendar/dist/Calendar.css";

import { TitleHeader } from "~/components/Shared";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import type { ProjectCreateFormType } from "../components";
import { ProjectForm } from "../components";
import { useCreate } from "./create.hooks";

const Create = () => {
  const app = useCreate();

  const { t } = useTranslation("project");

  return (
    <LayoutHeader>
      <TitleHeader title={t("프로젝트 생성하기")} onPrevious={() => app.handleBack()} />

      <LayoutContent as="form" gap={36} padding="22px" onSubmit={app.handleCreateProject}>
        <ProjectForm<ProjectCreateFormType> app={app} />
      </LayoutContent>
    </LayoutHeader>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["common", "project"]))
      }
    };
  }
);
