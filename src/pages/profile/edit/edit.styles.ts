import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text, flex, grid, position, size, text } from "~/styles/mixins";

export const Container = styled.form`
  ${flex.column({ gap: 46 })};

  padding: 32px;
`;

export const Header = styled.header`
  ${grid({ column: 3, justify: "start", align: "center" })};
  ${size({ width: "100%" })}

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const UploaderContainer = styled.div`
  ${position.absolute({ bottom: -10, right: -10 })}
`;

export const ValidateText = styled(Text)<{ state: string }>`
  ${text("textSmall")}
  ${({ theme: { colors }, state }) => css`
    color: ${state === "success" && colors.primary};
    color: ${state === "error" && colors.error};
    color: ${state === "normal" && colors.gray4};

    margin-top: 10px;
    padding-left: 18px;
  `}
`;
