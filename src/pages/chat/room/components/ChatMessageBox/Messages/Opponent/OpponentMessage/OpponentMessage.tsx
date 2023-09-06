import type { OpponentProps } from "../Opponent.types";
import { OpponentBox } from "../OpponentBox";
import * as Styled from "./OpponentMessage.styles";

export const OpponentMessage = (props: OpponentProps) => {
  return (
    <OpponentBox {...props}>
      <Styled.Bubble>{props.message.message}</Styled.Bubble>
    </OpponentBox>
  );
};
