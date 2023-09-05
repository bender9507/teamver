import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, Button, IconButton } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { Flex, FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import { useProjectStatusUpdate } from "./ProjectStatusUpdate.hooks";
import * as Styled from "./ProjectStatusUpdate.styles";
import type { ProjectStatusUpdateProps } from "./ProjectStatusUpdate.types";

export const ProjectStatusUpdate = ({ project, isMine }: ProjectStatusUpdateProps) => {
  const { t } = useTranslation("profile");
  const app = useProjectStatusUpdate({ project, isMine });

  return (
    <Styled.Container>
      <Flex onClick={() => app.handleOpenProjectDetail()}>
        <Avatar src={project.imageUrl} size="medium" shape="square" />
      </Flex>

      <Styled.Content>
        <Text size="textMedium" ellipsis onClick={() => app.handleOpenProjectDetail()}>
          {project.name}
        </Text>

        <Flex>
          <Link href={{ pathname: routes.projectMember, query: { projectId: project.id } }}>
            <Button size="small" color="white" bgColor="backgroundSecondary">
              {t("팀원보기")}
            </Button>
          </Link>
        </Flex>
      </Styled.Content>

      {isMine && (
        <FlexCenter>
          <IconButton
            name="more"
            onClick={() =>
              app.mount(
                <FlexColumn gap={36} align="center" style={{ padding: "73px 0" }}>
                  {app.actionSets[project.state].map(([labelKey, action]) => (
                    <Text key={labelKey} onClick={action}>
                      {t(labelKey)}
                    </Text>
                  ))}
                </FlexColumn>,
                {
                  id: "projectStateChangeModal",
                  type: "bottom"
                }
              )
            }
          />
        </FlexCenter>
      )}
    </Styled.Container>
  );
};
