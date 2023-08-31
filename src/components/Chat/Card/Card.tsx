import { Avatar, Button } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useCard } from "./Card.hooks";
import type { CardProps } from "./Card.types";

export const Card = ({ invite }: CardProps) => {
  const app = useCard({ invite });

  return (
    <Flex justify="between">
      <Flex gap={8} onClick={() => app.handleOpenProjectDetail()}>
        <Avatar src={invite.project.imageUrl} />
        <FlexColumn justify="around">
          <Text size="textMediumBold">{invite.project.ownerProfile.name}</Text>
          <Text size="textMedium" color="gray9">
            {invite.project.name}
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
          수락
        </Button>
        <Button
          size="small"
          color="white"
          bgColor="backgroundSecondary"
          onClick={() => app.handleStateChange("DENIED")}
        >
          삭제
        </Button>
      </Flex>
    </Flex>
  );
};
