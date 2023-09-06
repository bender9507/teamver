import { useTranslation } from "next-i18next";
import { useSelectChatRequestMemberQuery } from "~/states/server/chat";
import { FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { ChatRequestCard } from "../ChatRequestCard";
import { useChatRequestOwner } from "./Owner.hooks";

export const Owner = () => {
  const app = useChatRequestOwner();
  const { t } = useTranslation("chat");

  const { data: requests } = useSelectChatRequestMemberQuery({
    receiverId: app.user.id,
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
        <ChatRequestCard
          key={request.id}
          request={request}
          onGrant={app.handleRequestGrant}
          onDenied={app.handleRequestDenied}
        />
      ))}
    </FlexColumn>
  );
};
