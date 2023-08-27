import type { PropsWithChildren } from "react";
import { IconButton } from "~/components/Commons";
import { useTinderCard } from "./TinderCard.hooks";
import * as Styled from "./TinderCard.styles";
import type { TinderCardProps } from "./TinderCard.types";

export const TinderCard = ({ children, ...props }: PropsWithChildren<TinderCardProps>) => {
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
      <Styled.Card>
        {children}
        {/* <Styled.Gradient /> */}
      </Styled.Card>

      <Styled.SelectBox>
        <IconButton name="close" color="gray2" width={36} height={36} onClick={app.handleCancel} />

        <IconButton
          name="bookmark"
          color="gray2"
          width={36}
          height={36}
          onClick={app.handleConfirm}
        />
      </Styled.SelectBox>
    </Styled.Container>
  );
};
