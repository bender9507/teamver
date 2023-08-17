import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size } from "~/styles/mixins";
import type { RatioBoxProps } from "./RatioBox.types";

export const Container = styled.figure<RatioBoxProps>`
  position: relative;

  ${size({ width: "100%", height: "100%" })}

  ${({ ratio = "1/1" }) => {
    const [x, y] = ratio.split("/");

    const paddingTop = (Number(y) / Number(x)) * 100;

    return css`
      padding-top: ${paddingTop}%;
    `;
  }}
`;
