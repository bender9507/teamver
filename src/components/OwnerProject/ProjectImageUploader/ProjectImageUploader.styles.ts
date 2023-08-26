import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { flex, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const containerStyle = ({ theme: { colors } }: WithTheme) => {
  return css`
    position: relative;
    overflow: hidden;

    ${flex.center()};

    ${size({ width: "100%", height: "300px" })};

    background-color: ${colors.backgroundSecondary};

    border-radius: 0 100px 0 0;
  `;
};

export const Container = styled.div`
  ${(props) => containerStyle(props)}
`;

export const ProfilePreview = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

export const UploadButton = styled.div`
  ${({ theme: { colors } }) => css`
    ${flex.center()};

    ${size({ width: 84, height: 84 })};

    background-color: ${colors.content3};

    border-radius: 50%;
  `}
`;
