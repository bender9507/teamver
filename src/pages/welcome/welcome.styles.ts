import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex, position, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { ProgressStyleProps } from "./welcome.types";

export const Container = styled.form`
  display: grid;
  grid-template-rows: auto auto 1fr;

  ${size({ fullScreen: true })}
`;

export const progressStyle = ({
  theme: { colors },
  current,
  max
}: WithTheme<ProgressStyleProps>) => {
  const percent = (current / max) * 100;

  return css`
    position: relative;

    ${size({ width: "100%", height: "10px" })};

    background-color: ${colors.content3};

    &::after {
      content: "";
      ${position.absolute({ top: 0, left: 0 })};

      ${size({ width: "100%", height: "100%" })};

      background-color: ${colors.blue};

      transition: 300ms;
      transform: scaleX(${percent}%);
      transform-origin: left;
    }
  `;
};

export const Progress = styled.div<ProgressStyleProps>`
  ${(props) => progressStyle(props)}
`;

export const PageController = styled.div`
  ${flex({ justify: "between", align: "center" })};

  padding: 16px;
`;

export const SectionDisplay = styled.div`
  overflow: hidden;
`;

export const SectionContainer = styled.div<{ step: number }>`
  display: flex;

  height: 100%;

  ${({ step }) => css`
    transition: 300ms;
    transform: translateX(-${step * 100}%);
  `}
`;

export const Section = styled(FlexColumn)<{ isGrid?: boolean }>`
  ${({ isGrid }) =>
    isGrid &&
    css`
      display: grid;
      grid-template-rows: auto 1fr;
    `}

  flex-shrink: 0;

  width: 100%;

  padding: 70px 28px;
`;
