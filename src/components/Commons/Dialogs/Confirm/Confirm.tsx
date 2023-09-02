import { useTranslation } from "next-i18next";
import type { MouseEvent } from "react";
import { useLockBodyScroll } from "react-use";
import { useOverlayStore } from "~/states/client";
import { Text } from "~/styles/mixins";
import * as Styled from "./Confirm.styles";
import type { ConfirmProps } from "./Confirm.types";

export const Confirm = ({
  id,
  title,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel
}: ConfirmProps) => {
  const { unmount } = useOverlayStore();
  const { t } = useTranslation("common");

  const handleClose = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (target === currentTarget) unmount(id);
  };

  useLockBodyScroll(true);

  return (
    <Styled.Outer onClick={handleClose}>
      <Styled.Inner>
        <Styled.Content>
          <Text as="h3" size="heading5" color="white" whiteSpace="pre-wrap" textAlign="center">
            {title}
          </Text>

          {message && (
            <Text as="span" color="gray9" size="textSmall" textAlign="center">
              {message}
            </Text>
          )}
        </Styled.Content>

        <Styled.ButtonBox>
          <Styled.Button onClick={onCancel}>{cancelLabel ?? t("확인")}</Styled.Button>
          <Styled.Button onClick={onConfirm}>{confirmLabel ?? t("취소")}</Styled.Button>
        </Styled.ButtonBox>
      </Styled.Inner>
    </Styled.Outer>
  );
};
