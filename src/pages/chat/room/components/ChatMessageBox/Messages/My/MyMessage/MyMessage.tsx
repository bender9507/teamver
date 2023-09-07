import { type PropsWithChildren } from "react";
import type { MyProps } from "../My.types";
import { MyBox } from "../MyBox";
import * as Styled from "./MyMessage.styles";

export const MyMessage = (props: PropsWithChildren<MyProps>) => {
  return (
    <MyBox {...props}>
      <Styled.Bubble>{props.message.message}</Styled.Bubble>
    </MyBox>
  );
};
