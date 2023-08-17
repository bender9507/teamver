import * as svgList from "~/assets/icons";
import * as Styled from "./IconButton.styles";
import type { IconButtonProps } from "./IconButton.types";

export const IconButton = ({ name, ...props }: IconButtonProps) => {
  const Svg = svgList[name];

  return (
    <Styled.Container {...props}>
      <Svg />
    </Styled.Container>
  );
};
