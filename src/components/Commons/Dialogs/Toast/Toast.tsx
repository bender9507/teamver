import { useEffect } from "react";
import { Icon, IconButton } from "~/components/Commons";
import { useProgress } from "~/hooks";
import { useOverlayStore } from "~/states/client";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Toast.styles";
import type { ToastProps } from "./Toast.types";

export const Toast = ({ id, message, type = "info" }: ToastProps) => {
  const { unmount } = useOverlayStore();

  const { value, connect, disconnect, isEnd } = useProgress(3);

  useEffect(() => {
    if (isEnd) unmount(id);
  }, [id, isEnd, unmount]);

  return (
    <Styled.Container type={type} onMouseEnter={disconnect} onMouseLeave={connect}>
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

      <Styled.Progress type={type} value={value} />
    </Styled.Container>
  );
};
