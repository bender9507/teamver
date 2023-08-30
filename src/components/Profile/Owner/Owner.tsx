import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { IconButton } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { FlexColumn, Position, Text } from "~/styles/mixins";
import { SectionContainer } from "../Profile.styles";
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
          <FlexColumn gap={18}>
            <Text size="titleSmall">모집 중</Text>

            <FlexColumn gap={12}>
              {app.projects
                .filter((project) => project.state === "IN_RECRUIT")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} isMine={app.isMine} />
                ))}
            </FlexColumn>
          </FlexColumn>

          <FlexColumn gap={18}>
            <Text size="titleSmall">모집 완료</Text>

            <FlexColumn gap={12}>
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
        <Position position="absolute" bottom={84} right={24}>
          <IconButton
            name="floatingButton"
            width={50}
            height={50}
            onClick={app.handleProjectCreate}
          />
        </Position>
      )}
    </NavbarLayout>
  );
};
