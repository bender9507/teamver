import { keyframes } from "@emotion/react";

export const scale = (startScale = 0) => keyframes`
  0% {
    scale: ${startScale};
  }
  100% {
    scale: 1;
  }
`;
