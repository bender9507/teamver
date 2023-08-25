import { Icon, IconButton } from "~/components/Commons";
import { useOverlayStore } from "~/states/client";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Toast.styles";
import type { ToastProps } from "./Toast.types";

export const Toast = ({ id, message, type = "info" }: ToastProps) => {
  const { unmount } = useOverlayStore();

  return (
    <Styled.Container type={type}>
      <FlexCenter gap={12}>
        <Icon name={type} />

        <Text color="content1" whiteSpace="nowrap">
          {message}
        </Text>

        <IconButton
          name="close"
          color="content3"
          width={20}
          height={20}
          onClick={() => unmount(id)}
        />
      </FlexCenter>
    </Styled.Container>
  );
};
