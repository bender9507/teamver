import { useTranslation } from "next-i18next";
import { FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { CategoryTab } from "../CategoryTab";
import { Container, SectionContainer } from "../Profile.styles";
import { ProfileBox } from "../ProfileBox";
import { ProjectStatusUpdate } from "../ProjectCard/ProjectStatusUpdate";
import { useMember } from "./Member.hooks";

export const Member = () => {
  const app = useMember();
  const { t } = useTranslation("profile");

  return (
    <Container>
      <ProfileBox profile={app.profile} isMine={app.isMine} />

      <CategoryTab
        items={[
          { id: "IN_PROJECT", label: t("진행 중인 프로젝트") },
          { id: "DONE_PROJECT", label: t("완료된 프로젝트") }
        ]}
        selectedId={app.selectedTab}
        onClick={app.setSelectedTab}
      />

      {app.selectedTab === "IN_PROJECT" && (
        <SectionContainer gap={12}>
          {isEmpty(app.inProjects) && (
            <FlexColumn align="center" style={{ marginTop: "98px" }}>
              <Text size="textMediumBold" color="gray6">
                {t("진행 중인 프로젝트가 없어요")}
              </Text>
            </FlexColumn>
          )}

          {app.inProjects.map((project) => (
            <ProjectStatusUpdate key={project.id} project={project} />
          ))}
        </SectionContainer>
      )}

      {app.selectedTab === "DONE_PROJECT" && (
        <SectionContainer gap={12}>
          {isEmpty(app.doneProjects) && (
            <FlexColumn align="center" style={{ marginTop: "98px" }}>
              <Text size="textMediumBold" color="gray6">
                {t("완료된 프로젝트가 없어요")}
              </Text>
            </FlexColumn>
          )}

          {app.doneProjects.map((project) => (
            <ProjectStatusUpdate key={project.id} project={project} />
          ))}
        </SectionContainer>
      )}
    </Container>
  );
};
