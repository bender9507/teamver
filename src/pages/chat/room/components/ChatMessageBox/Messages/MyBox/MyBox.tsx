import type { PropsWithChildren } from "react";
import { Flex, Text } from "~/styles/mixins";
import { useMessages } from "../Messages.hooks";
import type { MyProps } from "../Messages.types";

export const MyBox = ({ children, message, isChainingEnd }: PropsWithChildren<MyProps>) => {
  const app = useMessages({ message });

  return (
    <Flex justify="end" align="end" gap={8}>
      {isChainingEnd && (
        <Text size="textSmall" color="gray6" whiteSpace="nowrap">
          {app.time}
        </Text>
      )}

      {children}
    </Flex>
  );
};
