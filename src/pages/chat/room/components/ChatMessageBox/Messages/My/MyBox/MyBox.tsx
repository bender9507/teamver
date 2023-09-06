import type { PropsWithChildren } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { Flex, Text } from "~/styles/mixins";
import { useMessages } from "../../Messages.hooks";

export const MyBox = ({ children, message }: PropsWithChildren<{ message: ChatMessageData }>) => {
  const app = useMessages({ message });

  return (
    <Flex justify="end" align="end" gap={8}>
      <Text size="textSmall" color="gray6" whiteSpace="nowrap">
        {app.time}
      </Text>

      {children}
    </Flex>
  );
};
