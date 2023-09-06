import type { PropsWithChildren } from "react";
import { Avatar } from "~/components/Commons";
import type { ChatMessageData } from "~/states/server/chat";
import { Flex, SizeBox, Text } from "~/styles/mixins";
import { useMessages } from "../../Messages.hooks";

export const OpponentBox = ({
  children,
  message,
  isChaining
}: PropsWithChildren<{ message: ChatMessageData; isChaining: boolean }>) => {
  const { sender } = message;

  const app = useMessages({ message });

  return (
    <Flex gap={8}>
      <SizeBox width={32} height={32}>
        {!isChaining && <Avatar size="small" src={sender.imageUrl} />}
      </SizeBox>

      {children}

      <Text size="textSmall" color="gray6" whiteSpace="nowrap" style={{ alignSelf: "end" }}>
        {app.time}
      </Text>
    </Flex>
  );
};
