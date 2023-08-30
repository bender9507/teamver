import { Avatar, Button, useModal } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { CardProps } from "./Card.types";

export const Card = ({ invite }: CardProps) => {
  const { mount } = useModal();

  return (
    <Flex justify="between">
      <Flex gap={8}>
        <Avatar src={invite.project.imageUrl} />
        <FlexColumn justify="around">
          <Text>{invite.project.ownerProfile.name}</Text>
          <Text color="gray2">{invite.project.name}</Text>
        </FlexColumn>
      </Flex>

      <Flex gap={8} align="center">
        <Button
          size="small"
          color="white"
          bgColor="backgroundSecondary"
          onClick={() => {
            mount(<Text>안녕하세요</Text>, { id: "sample", type: "bottom" });
          }}
        >
          수락
        </Button>
        <Button size="small" color="white" bgColor="backgroundSecondary">
          수락
        </Button>
      </Flex>
    </Flex>
  );
};
