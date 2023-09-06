import Image from "next/image";
import type { PropsWithChildren } from "react";
import { RatioBox } from "~/components/Commons";
import type { ChatMessageData } from "~/states/server/chat";
import { Flex, SizeBox, Text } from "~/styles/mixins";
import { useMessages } from "../Messages.hooks";

export const MyEmoji = ({ message }: PropsWithChildren<{ message: ChatMessageData }>) => {
  const { message: content } = message;

  const app = useMessages({ message });

  return (
    <Flex gap={8} justify="end">
      <Text size="textSmall" color="gray6" whiteSpace="nowrap" style={{ alignSelf: "end" }}>
        {app.time}
      </Text>

      <SizeBox width={50} height={50}>
        <RatioBox>
          <Image src={content} alt="이모티콘" fill />
        </RatioBox>
      </SizeBox>
    </Flex>
  );
};
