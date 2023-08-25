import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex, position, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { ProgressStyleProps } from "./welcome.types";

export const Container = styled.form`
  ${flex.column({ justify: "between" })};

  ${size({ fullScreen: true })};

  padding: 0 32px 32px 32px;
`;

export const Content = styled.div``;

export const progressStyle = ({
  theme: { colors },
  current,
  max
}: WithTheme<ProgressStyleProps>) => {
  const percent = (current / max) * 100;

  return css`
    position: relative;
    overflow: hidden;

    ${size({ width: "100%", height: "5px" })};

    background-color: ${colors.gray5};

    border-radius: 8px;

    &::after {
      content: "";
      ${position.absolute({ top: 0, left: 0 })};

      ${size({ width: "100%", height: "100%" })};

      background-color: ${colors.primary};

      transition: 300ms;
      transform: scaleX(${percent}%);
      transform-origin: left;
    }
  `;
};

export const Progress = styled.div<ProgressStyleProps>`
  ${(props) => progressStyle(props)}
`;

export const Header = styled.header`
  ${flex({ align: "center" })};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const SectionDisplay = styled.div`
  overflow: hidden;

  flex: 1;
`;

export const SectionContainer = styled.div<{ step: number }>`
  ${flex({ gap: 100 })};

  height: 100%;

  ${({ step }) => css`
    transition: 300ms;
    transform: translateX(calc(-${step * 100}% - ${step * 100}px));
  `}
`;

export const Section = styled.div<{ isGrid?: boolean }>`
  ${flex.column({ gap: 70 })};
  flex-shrink: 0;

  width: 100%;
`;

export const TitleBox = styled(FlexColumn)`
  height: 100px;
`;
