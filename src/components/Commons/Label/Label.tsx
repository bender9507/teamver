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
      <Styled.Title size="heading3">{title}</Styled.Title>

      {desc && <Styled.Desc size="paragraph3">{desc}</Styled.Desc>}

      {children}

      {itemDesc && (
        <Styled.ItemDesc size="paragraph3" color="content2">
          {itemDesc}
        </Styled.ItemDesc>
      )}
    </FlexColumn>
  );
};
