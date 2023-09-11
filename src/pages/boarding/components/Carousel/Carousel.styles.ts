import { css } from "@emotion/react";
import styled from "@emotion/styled";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { FlexColumn } from "~/styles/mixins";

export const BoardSlider = styled(Slider)`
  .slick-slide {
    width: 300px;
    margin-top: 150px;

    @media (min-width: 500px) {
      margin-top: 200px;
    }
  }

  .slick-dots {
    position: absolute;
    top: 56px;

    display: flex;
    justify-content: center;

    height: 20px;

    li {
      margin: 0;
      padding: 0 5px;
    }

    li button:before {
      ${({ theme: { colors } }) => css`
        color: ${colors.gray6};
      `}
    }
    li.slick-active button:before {
      ${({ theme: { colors } }) => css`
        color: ${colors.primary};
      `}
    }
  }
`;

export const TextWrapper = styled(FlexColumn)`
  position: relative;
  top: -50px;
  align-items: center;

  gap: 5px;

  z-index: 0;

  @media (min-width: 500px) {
    top: -90px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;

  @media (min-width: 500px) {
    width: 90%;
    height: 75vh;
  }
`;
