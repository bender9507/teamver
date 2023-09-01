import type { User } from "@supabase/supabase-js";
import { Avatar, Button } from "~/components/Commons";
import type { ChatRequestMemberAllData } from "~/states/server/chat";
import { Flex, Text } from "~/styles/mixins";
import { useChatRequestCard } from "./ChatRequestCard.hooks";

export const ChatRequestCard = ({
  request,
  user
}: {
  request: ChatRequestMemberAllData;
  user: User;
}) => {
  const app = useChatRequestCard({ request, user });

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
          onClick={app.handleRequestGrant}
        >
          수락
        </Button>

        <Button
          size="small"
          color="content1"
          bgColor="backgroundSecondary"
          onClick={app.handleRequestDenied}
        >
          삭제
        </Button>
      </Flex>
    </Flex>
  );
};
