import { useTranslation } from "next-i18next";
import { useChatRoomOut } from "./ChatRoomOut.hooks";
import * as Styled from "./ChatRoomOut.styles";

export const ChatRoomOut = ({ roomId, userId }: { roomId: number; userId: string }) => {
  const { t } = useTranslation("chat");

  const app = useChatRoomOut({ roomId, userId });

  return (
    <Styled.ChatRoomOutWrapper>
      <Styled.ChatRoomOutText>{t("신고하기")}</Styled.ChatRoomOutText>
      <Styled.ChatRoomOutText onClick={app.handleRoomOutClick}>
        {t("채팅방 나가기")}
      </Styled.ChatRoomOutText>
    </Styled.ChatRoomOutWrapper>
  );
};
