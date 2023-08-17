import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";
import type { SocialLoginProps } from "./SocialLoginButton";
import { BG_COLOR_MAP, ICON_COLOR_MAP } from "./SocialLoginButton.constants";

export const SocialButton = styled.button<Pick<SocialLoginProps, "provider">>`
  ${flex.center()}

  ${size.circle(54)}

  ${({ provider }) => css`
    background-color: ${BG_COLOR_MAP[provider]};

    color: ${ICON_COLOR_MAP[provider]};
  `};
`;
