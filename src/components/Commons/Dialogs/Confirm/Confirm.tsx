import { Button } from "~/components/Commons";
import { Flex, Text } from "~/styles/mixins";
import { Dialogs } from "../Dialogs";
import type { ConfirmProps } from "./Confirm.types";

export const Confirm = ({
  title,
  message,
  confirmLabel = "확인",
  onConfirm,
  cancelLabel = "취소",
  onCancel,
  ...props
}: ConfirmProps) => {
  return (
    <Dialogs {...props}>
      {title && (
        <Text as="h3" size="heading4">
          {title}
        </Text>
      )}

      <Text as="p" color="content1">
        {message}
      </Text>

      <Flex gap={8}>
        <Button onClick={onConfirm}>{confirmLabel}</Button>

        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </Flex>
    </Dialogs>
  );
};
