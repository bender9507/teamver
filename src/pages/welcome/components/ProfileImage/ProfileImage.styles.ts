import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { FlexColumn, Grid, PosCenter, flex, position, size } from "~/styles/mixins";

export const ProfileCardContainer = styled(Grid)`
  position: relative;
  overflow: hidden;

  ${flex.column({ justify: "end", gap: 13 })};

  ${size({ width: "100%", height: "100%" })};

  padding: 64px 24px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.gray4};
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

export const Gradient = styled.div`
  ${position.absolute({ bottom: 0, left: 0 })};

  ${size({ width: "100%", height: "45%" })};

  background: linear-gradient(
    180deg,
    rgba(34, 34, 34, 0) 0%,
    rgba(34, 34, 34, 0.57) 65.35%,
    #222 100%
  );
`;
