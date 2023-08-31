import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { Container, SectionContainer } from "../Profile.styles";
import { ProfileSection } from "../ProfileSection";
import { ProjectCard } from "../ProjectCard";
import { SectionTab } from "../SectionTab";
import { useMember } from "./Member.hooks";

export const Member = ({ user }: { user: User }) => {
  const app = useMember({ user });
  const { t } = useTranslation("profile");

  return (
    <Container>
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
        <SectionContainer gap={26}>
          {app.projects
            .filter((project) => project.state !== "DONE_PROJECT")
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </SectionContainer>
      )}

      {app.selectedTab === "DONE_PROJECT" && (
        <SectionContainer gap={26}>
          {app.projects
            .filter((project) => project.state === "DONE_PROJECT")
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </SectionContainer>
      )}
    </Container>
  );
};
