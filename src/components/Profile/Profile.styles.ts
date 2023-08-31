import styled from "@emotion/styled";
import { FlexColumn, flex, position } from "~/styles/mixins";

export const Container = styled.div`
  min-height: 100svh;
`;

export const SectionContainer = styled(FlexColumn)`
  padding: 32px 20px;
`;

export const FloatingBox = styled.div`
  ${position.sticky({ bottom: 84 })};

  padding: 0 20px;

  ${flex({ justify: "end" })};
`;
