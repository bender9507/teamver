import { useTranslation } from "next-i18next";
import { Flex, FlexCenter, Text } from "~/styles/mixins";
import { Avatar, Icon } from "../Commons";
import { useProjectInvite } from "./ProjectInvite.hooks";

export const ProjectInvite = ({ ownerId }: { ownerId: string }) => {
  const { t } = useTranslation("project");
  const app = useProjectInvite(ownerId);
  console.log("프로젝트", app);

  return (
    <FlexCenter direction="column" gap={37}>
      <Text>{t("어떤 프로젝트에 초대할까요")}</Text>

      <Flex direction="column" gap={25}>
        {app.projects.map((project) => (
          <Flex align="center" gap={12}>
            <Icon name="success" color="gray2" />
            <Avatar src={project.imageUrl} size="small" />
            <Text key={project.id}>{project.name}</Text>
          </Flex>
        ))}
      </Flex>
    </FlexCenter>
  );
};
