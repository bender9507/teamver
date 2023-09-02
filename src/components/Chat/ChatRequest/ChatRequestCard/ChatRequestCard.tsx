import { Avatar, Button } from "~/components/Commons";
import type { ChatRequestMemberAllData, ChatRequestOwnerAllData } from "~/states/server/chat";
import { Flex, Text } from "~/styles/mixins";

export const ChatRequestCard = ({
  request,
  onGrant,
  onDenied
}: {
  request: ChatRequestMemberAllData | ChatRequestOwnerAllData;
  onGrant: (request: ChatRequestMemberAllData | ChatRequestOwnerAllData) => void;
  onDenied: (request: ChatRequestMemberAllData | ChatRequestOwnerAllData) => void;
}) => {
  return (
    <Flex align="center" justify="between" gap={8}>
      <Flex align="center" gap={8}>
        <Avatar src={request.requesterProfile.imageUrl} />

        <Text textAlign="start">{request.requesterProfile.name}</Text>
      </Flex>

      <Flex gap={8}>
        <Button
          size="small"
          color="content1"
          bgColor="backgroundSecondary"
          onClick={() => onGrant(request)}
        >
          수락
        </Button>

        <Button
          size="small"
          color="content1"
          bgColor="backgroundSecondary"
          onClick={() => onDenied(request)}
        >
          삭제
        </Button>
      </Flex>
    </Flex>
  );
};
