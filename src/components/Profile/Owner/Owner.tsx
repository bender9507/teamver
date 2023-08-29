import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { Icon } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { FlexColumn, Text } from "~/styles/mixins";
import { CreateProject, SectionContainer } from "../Profile.styles";
import { ProfileSection } from "../ProfileSection";
import { ProjectCard } from "../ProjectCard";
import { SectionTab } from "../SectionTab";
import { useOwner } from "./Owner.hooks";

export const Owner = ({ user }: { user: User }) => {
  const app = useOwner({ user });
  const { t } = useTranslation("profile");

  return (
    <NavbarLayout>
      <ProfileSection profile={app.profile} isMine={app.isMine} />

      <SectionTab
        items={[
          { id: "IN_PROJECT", label: t("진행 중인 프로젝트") },
          { id: "DONE_PROJECT", label: t("완료된 프로젝트") }
        ]}
        selectedId={app.selectedTab}
        onClick={app.setSelectedTab}
      />

      {app.selectedTab === "IN_PROJECT" && (
        <SectionContainer gap={46}>
          <FlexColumn gap={26}>
            <Text size="heading4">모집 중인 프로젝트</Text>

            <FlexColumn gap={26}>
              {app.projects
                .filter((project) => project.state === "IN_RECRUIT")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} isMine={app.isMine} />
                ))}
            </FlexColumn>
          </FlexColumn>

          <FlexColumn gap={26}>
            <Text size="heading4">모집 완료된 프로젝트</Text>

            <FlexColumn gap={26}>
              {app.projects
                .filter((project) => project.state === "DONE_RECRUIT")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} isMine={app.isMine} />
                ))}
            </FlexColumn>
          </FlexColumn>
        </SectionContainer>
      )}

      {app.selectedTab === "DONE_PROJECT" && (
        <SectionContainer gap={26}>
          {app.projects
            .filter((project) => project.state === "DONE_PROJECT")
            .map((project) => (
              <ProjectCard key={project.id} project={project} isMine={app.isMine} />
            ))}
        </SectionContainer>
      )}

      {app.isMine && (
        <CreateProject onClick={app.handleProjectCreate}>
          <Icon name="add" width={32} height={32} />
        </CreateProject>
      )}
    </NavbarLayout>
  );
};
