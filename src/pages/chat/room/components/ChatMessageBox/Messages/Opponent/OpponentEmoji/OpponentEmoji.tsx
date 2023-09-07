import Image from "next/image";
import type { PropsWithChildren } from "react";
import { RatioBox } from "~/components/Commons";
import { SizeBox } from "~/styles/mixins";
import type { OpponentProps } from "../Opponent.types";
import { OpponentBox } from "../OpponentBox";

export const OpponentEmoji = (props: PropsWithChildren<OpponentProps>) => {
  return (
    <OpponentBox {...props}>
      <SizeBox width={150} height={150}>
        <RatioBox>
          <Image
            src={props.message.message}
            alt="이모티콘"
            sizes="100%"
            fill
            style={{ objectFit: "contain" }}
          />
        </RatioBox>
      </SizeBox>
    </OpponentBox>
  );
};
