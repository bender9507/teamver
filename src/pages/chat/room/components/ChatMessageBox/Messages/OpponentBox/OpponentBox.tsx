import type { PropsWithChildren } from "react";
import { Avatar } from "~/components/Commons";
import { Flex, SizeBox, Text } from "~/styles/mixins";
import { useMessages } from "../Messages.hooks";
import type { OpponentProps } from "../Messages.types";

export const OpponentBox = ({
  children,
  message,
  isChaining,
  isChainingEnd
}: PropsWithChildren<OpponentProps>) => {
  const { sender } = message;

  const app = useMessages({ message });

  return (
    <Flex gap={8}>
      <SizeBox minWidth={32} height={32}>
        {!isChaining && <Avatar size="small" src={sender.imageUrl} />}
      </SizeBox>

      {children}

      {isChainingEnd && (
        <Text size="textSmall" color="gray6" whiteSpace="nowrap" style={{ alignSelf: "end" }}>
          {app.time}
        </Text>
      )}
    </Flex>
  );
};
