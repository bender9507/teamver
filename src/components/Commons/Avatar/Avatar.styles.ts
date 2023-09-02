import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { flex, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import { avatarSizeMap } from "./Avatar.constants";
import type { AvatarStyleProps } from "./Avatar.types";

export const avatarContainerStyle = ({
  theme,
  size: _size = "medium",
  shape = "circle"
}: WithTheme<AvatarStyleProps>) => {
  const avatarSize = avatarSizeMap[_size];

  return css`
    position: relative;

    ${flex.center()};

    ${size({ minWidth: avatarSize, height: avatarSize })}
    overflow: hidden;

    ${shape === "circle"}

    border-radius: ${shape === "circle" ? "50%" : "8px"};

    background-color: ${theme.colors.backgroundSecondary};
  `;
};

export const AvatarContainer = styled.div<AvatarStyleProps>`
  ${(props) => avatarContainerStyle(props)}
`;

export const Avatar = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
