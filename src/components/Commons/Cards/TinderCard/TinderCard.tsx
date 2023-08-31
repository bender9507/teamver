import { memo, type PropsWithChildren } from "react";
import { IconButton } from "~/components/Commons";
import { useTinderCard } from "./TinderCard.hooks";
import * as Styled from "./TinderCard.styles";
import type { TinderCardProps } from "./TinderCard.types";

export const TinderCard = memo((props: PropsWithChildren<TinderCardProps>) => {
  const { children, onRestore, withSelectBox = true } = props;
  const app = useTinderCard(props);

  return (
    <Styled.Container
      {...app.animation}
      onMouseDown={app.handleMouseDown}
      onMouseMove={app.handleMouseMove}
      onMouseUp={app.handleUp}
      onTouchStart={app.handleTouchStart}
      onTouchMove={app.handleTouchMove}
      onTouchEnd={app.handleUp}
    >
      <Styled.Card>{children}</Styled.Card>

      {withSelectBox && (
        <Styled.SelectBox>
          <IconButton
            name="close"
            color="gray7"
            width={32}
            height={32}
            onClick={app.handleCancel}
          />

          {onRestore && (
            <IconButton name="rollback" color="gray7" width={32} height={32} onClick={onRestore} />
          )}

          <IconButton
            name="bookmark"
            color="gray7"
            width={32}
            height={32}
            onClick={app.handleConfirm}
          />
        </Styled.SelectBox>
      )}
    </Styled.Container>
  );
});
