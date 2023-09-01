import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { useSelectChatRequestMemberQuery } from "~/states/server/chat";
import { FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { ChatRequestCard } from "../ChatRequestCard";

export const ChatRequestOwner = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const { data: requests } = useSelectChatRequestMemberQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  return (
    <FlexColumn gap={12}>
      {isEmpty(requests) && (
        <PosCenter>
          <Text size="textMediumBold" color="gray6">
            {t("받은 채팅 요청이 없어요")}
          </Text>
        </PosCenter>
      )}

      {requests.map((request) => (
        <ChatRequestCard key={request.id} user={user} request={request} />
      ))}
    </FlexColumn>
  );
};
