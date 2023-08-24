import { useTinderCard } from "./TinderCard.hooks";
import * as Styled from "./TinderCard.styles";
import type { TinderCardProps } from "./TinderCard.types";

export const TinderCard = (props: TinderCardProps) => {
  const app = useTinderCard(props);

  return (
    <Styled.Container
      {...app.animation}
      onMouseDown={app.handleMouseDown}
      onMouseMove={app.handleMouseMove}
      onMouseUp={app.handleUp}
      onMouseLeave={app.handleUp}
      onTouchStart={app.handleTouchStart}
      onTouchMove={app.handleTouchMove}
      onTouchEnd={app.handleUp}
    >
      Tinder Card
    </Styled.Container>
  );
};
