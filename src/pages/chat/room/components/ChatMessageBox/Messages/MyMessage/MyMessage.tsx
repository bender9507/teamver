import { type PropsWithChildren } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { Flex, Text } from "~/styles/mixins";
import { useMessages } from "../Messages.hooks";
import * as Styled from "./MyMessage.styles";

export const MyMessage = ({ message }: PropsWithChildren<{ message: ChatMessageData }>) => {
  const { message: content } = message;

  const app = useMessages({ message });

  return (
    <Flex justify="end" align="end" gap={8}>
      <Text size="textSmall" color="gray6" whiteSpace="nowrap">
        {app.time}
      </Text>

      <Styled.Bubble>{content}</Styled.Bubble>
    </Flex>
  );
};
