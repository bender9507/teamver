import Image from "next/image";
import type { PropsWithChildren } from "react";
import { RatioBox } from "~/components/Commons";
import { SizeBox } from "~/styles/mixins";
import type { OpponentProps } from "..";
import { OpponentBox } from "../OpponentBox";

export const OpponentEmoji = (props: PropsWithChildren<OpponentProps>) => {
  return (
    <OpponentBox {...props}>
      <SizeBox width={50} height={50}>
        <RatioBox>
          <Image src={props.message.message} alt="이모티콘" fill sizes="100%" />
        </RatioBox>
      </SizeBox>
    </OpponentBox>
  );
};
