import Image from "next/image";
import type { PropsWithChildren } from "react";
import { RatioBox } from "~/components/Commons";
import type { ChatMessageData } from "~/states/server/chat";
import { SizeBox } from "~/styles/mixins";
import { MyBox } from "../MyBox";

export const MyEmoji = ({ message }: PropsWithChildren<{ message: ChatMessageData }>) => {
  const { message: content } = message;

  return (
    <MyBox message={message}>
      <SizeBox width={50} height={50}>
        <RatioBox>
          <Image src={content} alt="이모티콘" sizes="100%" fill />
        </RatioBox>
      </SizeBox>
    </MyBox>
  );
};
