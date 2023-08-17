import { useMemo } from "react";
import * as svgList from "~/assets/icons";
import * as Styled from "./Icon.styles";
import type { IconProps } from "./Icon.types";

export const Icon = ({ name, ...props }: IconProps) => {
  const Svg = useMemo(() => svgList[name], [name]);

  return (
    <Styled.Container {...props}>
      <Svg />
    </Styled.Container>
  );
};
