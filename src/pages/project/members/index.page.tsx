import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TitleHeader } from "~/components/Shared";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { ProjectMemberList } from "./components";

const ProjectMembers = () => {
  const { t } = useTranslation("project");

  return (
    <LayoutHeader>
      <TitleHeader title={t("프로젝트 팀원")} />

      <LayoutContent>
        <ProjectMemberList />
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ProjectMembers;

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
