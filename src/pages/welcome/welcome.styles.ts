import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { FlexColumn, Grid, PosCenter, flex, position, size } from "~/styles/mixins";
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

export const ProfileCardContainer = styled(Grid)`
  position: relative;
  overflow: hidden;

  ${flex.column({ justify: "end", gap: 13 })};

  ${size({ width: "100%", height: "100%" })};

  padding: 64px 24px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.gray4};

    background-image: linear-gradient(
      180deg,
      rgba(34, 34, 34, 0) 0%,
      rgba(34, 34, 34, 0.57) 65.35%,
      #222 100%
    );
  `};

  border-radius: 28px;
`;

export const ProfileAddButton = styled(PosCenter)`
  ${flex.center()};

  ${size({ width: 56, height: 56 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundPrimary};
  `};

  border-radius: 50%;
`;

export const ProfileDesc = styled(FlexColumn)`
  z-index: 1;
`;

export const ProfileImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
