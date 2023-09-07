import { useTranslation } from "next-i18next";
import { Container } from "../Profile.styles";
import { ProfileSection } from "../ProfileSection";
import { ProjectList } from "../ProjectList";
import { useMember } from "./Member.hooks";

export const Member = () => {
  const app = useMember();
  const { t } = useTranslation("profile");

  return (
    <Container>
      <ProfileSection selectedTab={app.selectedTab} setSelectedTab={app.setSelectedTab} />

      {app.selectedTab === "IN_PROJECT" && (
        <ProjectList
          selectedTab={app.selectedTab}
          inProjects={app.inProjects}
          doneProjects={app.doneProjects}
        />
      )}

      {app.selectedTab === "DONE_PROJECT" && (
        <ProjectList
          selectedTab={app.selectedTab}
          inProjects={app.inProjects}
          doneProjects={app.doneProjects}
        />
      )}
    </Container>
  );
};
