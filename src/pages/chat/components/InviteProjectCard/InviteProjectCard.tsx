import { useTranslation } from "next-i18next";
import { Avatar, Button } from "~/components/Commons";
import type { ProjectInviteAllRow } from "~/states/server/project";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useInviteProjectCard } from "./InviteProjectCard.hooks";

export const InviteProjectCard = (props: ProjectInviteAllRow) => {
  const { project } = props;

  const app = useInviteProjectCard(props);

  const { t } = useTranslation("chat");

  return (
    <Flex justify="between">
      <Flex gap={8} onClick={() => app.handleOpenProjectDetail()}>
        <Avatar src={project.imageUrl} />

        <FlexColumn justify="around">
          <Text size="textMediumBold">{project.ownerProfile.name}</Text>
          <Text size="textMedium" color="gray9">
            {project.name}
          </Text>
        </FlexColumn>
      </Flex>

      <Flex gap={8} align="center">
        <Button
          size="small"
          color="white"
          bgColor="backgroundSecondary"
          onClick={() => app.handleStateChange("GRANT")}
        >
          {t("수락")}
        </Button>
        <Button
          size="small"
          color="white"
          bgColor="backgroundSecondary"
          onClick={() => app.handleStateChange("DENIED")}
        >
          {t("삭제")}
        </Button>
      </Flex>
    </Flex>
  );
};
