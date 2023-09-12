import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, text } from "~/styles/mixins";
import { colors } from "~/styles/theme/colors";
import { hexToRgba } from "~/styles/utils";

export const Container = styled.div`
  position: relative;

  ${flex({ align: "center", justify: "between" })}

  height: 99px;

  padding: 0 22px;

  ${({ theme: { colors } }) => css`
    background-image: linear-gradient(
      to top,
      ${colors.backgroundSecondary},
      rgba(34, 34, 34, 0.81) 7.29%,
      rgba(34, 34, 34, 0.57),
      rgba(34, 34, 34, 0)
    );
  `}
`;

export const BlurChip = styled.span`
  position: relative;

  z-index: 1;

  padding: 10px 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${hexToRgba(colors.gray3, 0.3)};
    backdrop-filter: blur(5px);
  `};

  border-radius: 30px;

  ${text("textSmallRegular")};

  color: ${colors.content3};
`;

export const UserBox = styled.div`
  position: relative;

  z-index: 1;

  ${flex({ align: "center", gap: 8 })}
`;

export const DateBox = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundPrimary};
  `}
`;
