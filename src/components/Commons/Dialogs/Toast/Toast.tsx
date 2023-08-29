import { useMount } from "react-use";
import { Icon } from "~/components/Commons";
import { useOverlayStore } from "~/states/client";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Toast.styles";
import type { ToastProps } from "./Toast.types";

export const Toast = ({ id, message, type = "info" }: ToastProps) => {
  const { unmount } = useOverlayStore();

  useMount(() => {
    setTimeout(() => unmount(id), 3000);
  });

  return (
    <Styled.Container type={type}>
      <FlexCenter gap={12}>
        <Icon name={type} />

        <Text color="content1" whiteSpace="nowrap">
          {message}
        </Text>
      </FlexCenter>
    </Styled.Container>
  );
};
