import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Modal, useModal } from "../Commons";
import { CHAT_ROOM_OUT_MODAL } from "./ChatRoomOut.constants";
import * as Styled from "./ChatRoomOut.styles";

export const ChatRoomOut = () => {
  const { t } = useTranslation("chat");

  const { unmount } = useModal();

  const router = useRouter();

  const handleRoomOutClick = () => {
    // 채팅방 삭제하는 로직 필요

    router.back();
    unmount(CHAT_ROOM_OUT_MODAL);
  };

  return (
    <Modal id={CHAT_ROOM_OUT_MODAL} type="bottom">
      <Styled.ChatRoomOutWrapper>
        <Styled.ChatRoomOutText>{t("신고하기")}</Styled.ChatRoomOutText>
        <Styled.ChatRoomOutText onClick={handleRoomOutClick}>
          {t("채팅방 나가기")}
        </Styled.ChatRoomOutText>
      </Styled.ChatRoomOutWrapper>
    </Modal>
  );
};
