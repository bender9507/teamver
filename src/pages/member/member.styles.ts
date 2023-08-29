import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { FlexColumn, flex, position, size, text } from "~/styles/mixins";
import { colors } from "~/styles/theme/colors";
import { hexToRgba, styleHelper } from "~/styles/utils";

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 52px;

  ${size({ width: "100%", height: "100%" })};

  padding: 0 42px 52px 42px;
`;

export const Profile = styled(Image)`
  object-fit: cover;
  object-position: center;

  border-radius: 0px 0px 28px 28px;
`;

export const Gradient = styled.div`
  ${position.absolute({ bottom: 0, left: 0 })};
  z-index: 1;

  ${size({ width: "100%", height: "50%" })};

  border-radius: 0px 0px 27px 27px;
  background: linear-gradient(
    180deg,
    rgba(34, 34, 34, 0) 0%,
    rgba(34, 34, 34, 0.57) 58.85%,
    rgba(34, 34, 34, 0.81) 92.71%,
    #222 100%
  );
`;

export const Content = styled.div`
  z-index: 2;

  width: 100%;

  padding: 36px 24px;
`;

export const BlurChip = styled.span`
  padding: 10px 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${hexToRgba(colors.gray3, 0.3)};
    backdrop-filter: blur(5px);
  `};

  border-radius: 30px;

  ${text("paragraph3")};
  color: ${colors.content1};
`;

export const TypeButton = styled.button<{ isSelected: boolean }>`
  ${flex.center({ gap: 6 })};

  padding: 0 20px;

  ${({ theme: { sizes, colors }, isSelected }) => css`
    ${size({ height: sizes.height.large })};

    background-color: ${colors.backgroundSecondary};

    border-radius: 30px;

    color: ${colors.content1};

    ${isSelected && styleHelper("boxShadow", `inset 0 0 0 1px ${colors.primary}`)};
  `};
`;

export const CardContainer = styled.div`
  ${position.absolute({ top: 0, left: 0 })};

  ${size({ width: "100%", height: "100%" })};
`;

export const FilterContainer = styled(FlexColumn)`
  padding: 42px 36px 78px 36px;
`;
