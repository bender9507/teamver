import styled from "@emotion/styled";
import { FlexColumn, position, size } from "~/styles/mixins";

export const Container = styled.div`
  ${position.absolute({ top: 0, left: 0 })};

  ${size({ width: "100%", height: "100%" })};

  min-height: 100%;
  max-height: 100%;
`;

export const Gradient = styled.div`
  ${position.absolute({ bottom: 0, left: 0 })};
  z-index: 1;

  ${size({ width: "100%", height: "20%" })};

  background: linear-gradient(
    180deg,
    rgba(34, 34, 34, 0) 0%,
    rgba(34, 34, 34, 0.57) 58.85%,
    rgba(34, 34, 34, 0.81) 92.71%,
    #222 100%
  );
`;

export const ButtonWrapper = styled(FlexColumn)`
  position: absolute;

  bottom: 80px;
  width: 100%;
  align-items: center;

  z-index: 1;
`;
