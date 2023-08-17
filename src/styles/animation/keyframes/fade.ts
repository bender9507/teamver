import { keyframes } from "@emotion/react";

export const fade = (startOpacity = 0) => keyframes`
  0% {
    opacity: ${startOpacity};
  }
  100% {
    opacity: 1;
  }
`;
