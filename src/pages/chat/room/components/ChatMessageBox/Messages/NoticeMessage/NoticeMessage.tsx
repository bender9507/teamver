import { useTranslation } from "next-i18next";
import type { ChatMessageData } from "~/states/server/chat";

import * as Styled from "./NoticeMessage.styles";

export const NoticeMessage = ({ message }: { message: ChatMessageData }) => {
  const { t } = useTranslation("chat");

  return <Styled.Bubble>{t(message.message)}</Styled.Bubble>;
};
