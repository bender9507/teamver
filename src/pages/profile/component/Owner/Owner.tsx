import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";
import { FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { Container, FloatingIcon, SectionContainer } from "../Profile.styles";
import { ProfileSection } from "../ProfileSection";
import { SectionTab } from "../SectionTab";
import { useOwner } from "./Owner.hooks";
import { ProjectCard } from "./ProjectCard";

export const Owner = (): ReactNode => {
  const app = useOwner();

  const { t } = useTranslation("profile");

  return (
    <>
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
          <SectionContainer gap={32}>
            {isEmpty([...app.inRecruit, ...app.doneRecruit]) && (
              <FlexColumn align="center" style={{ marginTop: "98px" }}>
                <Text size="textMediumBold" color="gray6">
                  {t("진행 중인 프로젝트가 없어요")}
                </Text>
              </FlexColumn>
            )}

            {app.inRecruit.length > 0 && (
              <FlexColumn gap={18}>
                <Text size="titleSmall">{t("모집 중")}</Text>

                <FlexColumn gap={12}>
                  {app.inRecruit.map((project) => (
                    <ProjectCard key={project.id} project={project} isMine={app.isMine} />
                  ))}
                </FlexColumn>
              </FlexColumn>
            )}

            {app.doneRecruit.length > 0 && (
              <FlexColumn gap={18}>
                <Text size="titleSmall">{t("모집 완료")}</Text>

                <FlexColumn gap={12}>
                  {app.doneRecruit.map((project) => (
                    <ProjectCard key={project.id} project={project} isMine={app.isMine} />
                  ))}
                </FlexColumn>
              </FlexColumn>
            )}
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
              <ProjectCard key={project.id} project={project} isMine={app.isMine} />
            ))}
          </SectionContainer>
        )}
      </Container>

      {app.isMine && (
        <FloatingIcon
          name="floatingButton"
          width={50}
          height={50}
          onClick={app.handleProjectCreate}
        />
      )}
    </>
  );
};
