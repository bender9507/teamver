import type { User } from "@supabase/auth-helpers-nextjs";
import { FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { ChatRequestCard } from "../ChatRequestCard";
import { useChatRequestOwner } from "./ChatRequestOwner.hooks";

export const ChatRequestOwner = ({ user }: { user: User }) => {
  const app = useChatRequestOwner({ user });

  return (
    <FlexColumn gap={12}>
      {app.requests.length === 0 && (
        <PosCenter>
          <Text size="textMediumBold" color="gray6">
            받은 채팅 요청이 없어요
          </Text>
        </PosCenter>
      )}

      {app.requests.map((request) => (
        <ChatRequestCard key={request.id} user={user} request={request} />
      ))}
    </FlexColumn>
  );
};
