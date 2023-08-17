import { Button } from "~/components/Commons";
import { Flex, Text } from "~/styles/mixins";
import { Dialogs } from "../Dialogs";
import type { AlertProps } from "./Alert.types";

export const Alert = ({
  title,
  message,
  confirmLabel = "확인",
  onConfirm,
  ...props
}: AlertProps) => {
  return (
    <Dialogs {...props}>
      {title && (
        <Text size="heading4" as="h3">
          {title}
        </Text>
      )}

      <Text as="p" color="content1">
        {message}
      </Text>

      <Flex>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </Flex>
    </Dialogs>
  );
};
