import Image from "next/image";
import type { PropsWithChildren } from "react";
import { RatioBox } from "~/components/Commons";
import { SizeBox } from "~/styles/mixins";
import type { MyProps } from "../My.types";
import { MyBox } from "../MyBox";

export const MyEmoji = (props: PropsWithChildren<MyProps>) => {
  return (
    <MyBox {...props}>
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
    </MyBox>
  );
};
