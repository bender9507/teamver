import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex, position, size } from "~/styles/mixins";

export const SectionContainer = styled(FlexColumn)`
  padding: 32px 20px;
`;

export const CreateProject = styled.button`
  ${position.absolute({ bottom: 84, right: 24 })};

  ${flex.center()};

  ${size({ width: 50, height: 50 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.primary};
  `};

  border-radius: 50%;
`;
