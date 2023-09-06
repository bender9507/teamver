import Image from "next/image";
import type { PropsWithChildren } from "react";
import { RatioBox } from "~/components/Commons";
import type { ChatMessageData } from "~/states/server/chat";
import { SizeBox } from "~/styles/mixins";
import { OpponentBox } from "../OpponentBox";

export const OpponentEmoji = ({
  message,
  isChaining
}: PropsWithChildren<{ message: ChatMessageData; isChaining: boolean }>) => {
  const { message: content } = message;

  return (
    <OpponentBox message={message} isChaining={isChaining}>
      <SizeBox width={50} height={50}>
        <RatioBox>
          <Image src={content} alt="이모티콘" fill sizes="100%" />
        </RatioBox>
      </SizeBox>
    </OpponentBox>
  );
};
