import { FlexColumn } from "~/styles/mixins";
import type { PropsWithElement } from "~/types";
import * as Styled from "./Label.styles";

export const Label = ({
  children,
  title,
  desc,
  itemDesc
}: PropsWithElement<{ title: string; desc?: string; itemDesc?: string }>) => {
  return (
    <FlexColumn>
      <Styled.Title size="titleSmall">{title}</Styled.Title>

      {desc && (
        <Styled.Desc size="textSmallBold" color="gray9">
          {desc}
        </Styled.Desc>
      )}

      {children}

      {itemDesc && (
        <Styled.ItemDesc size="textSmall" color="gray4">
          {itemDesc}
        </Styled.ItemDesc>
      )}
    </FlexColumn>
  );
};
