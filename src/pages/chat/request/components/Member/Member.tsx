import { useTranslation } from "next-i18next";
import { FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { ChatRequestCard } from "../ChatRequestCard";
import { useChatRequestMember } from "./Member.hooks";

export const Member = () => {
  const app = useChatRequestMember();
  const { t } = useTranslation("chat");

  return (
    <FlexColumn gap={12}>
      {isEmpty(app.requests) && (
        <PosCenter>
          <Text size="textMediumBold" color="gray6">
            {t("받은 채팅 요청이 없어요")}
          </Text>
        </PosCenter>
      )}

      {app.requests.map((request) => (
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
