import { useTranslation } from "next-i18next";
import { FlexCenter, Text } from "~/styles/mixins";
import { useChatHeaderMore } from "./ChatHeaderMore.hooks";

export const CHAT_HEADER_MORE_MODAL = "CHAT_HEADER_MORE_MODAL";

export const ChatHeaderMore = () => {
  const app = useChatHeaderMore();

  const { t } = useTranslation("chat");

  return (
    <FlexCenter direction="column" padding="72px" gap={37}>
      <Text size="buttonMedium">{t("신고하기")}</Text>

      <Text size="buttonMedium" onClick={app.handleDeleteChatMember}>
        {t("채팅방 나가기")}
      </Text>
    </FlexCenter>
  );
};
