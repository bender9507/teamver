import Image from "next/image";
import type { PropsWithChildren } from "react";
import { Avatar, RatioBox } from "~/components/Commons";
import type { ChatMessageData } from "~/states/server/chat";
import { Flex, SizeBox, Text } from "~/styles/mixins";
import { useMessages } from "../Messages.hooks";

export const OpponentEmoji = ({
  message,
  isChaining
}: PropsWithChildren<{ message: ChatMessageData; isChaining: boolean }>) => {
  const { message: content, sender } = message;

  const app = useMessages({ message });

  return (
    <Flex gap={8}>
      <SizeBox width={32} height={32}>
        {!isChaining && <Avatar size="small" src={sender.imageUrl} />}
      </SizeBox>

      <SizeBox width={50} height={50}>
        <RatioBox>
          <Image src={content} alt="이모티콘" fill />
        </RatioBox>
      </SizeBox>

      <Text size="textSmall" color="gray6" whiteSpace="nowrap" style={{ alignSelf: "end" }}>
        {app.time}
      </Text>
    </Flex>
  );
};
