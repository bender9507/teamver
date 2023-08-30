import { css } from "@emotion/react";
import { colors } from "../theme/colors";

export const font = css`
  @font-face {
    font-family: "NanumSquareRound";
    src: url("/fonts/NanumSquareRoundOTFB.otf") format("opentype");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumSquareRound";
    src: url("/fonts/NanumSquareRoundOTFEB.otf") format("opentype");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumSquareRound";
    src: url("/fonts/NanumSquareRoundOTFR.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }

  body,
  button,
  input,
  textarea {
    font-family: "NanumSquareRound";
  }

  body {
    background-color: ${colors.backgroundPrimary};
  }
`;
