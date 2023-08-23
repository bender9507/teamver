import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const ProjectCard = styled.div`
  ${flex({ justify: "between", align: "center" })};

  ${size({ width: "100%" })};

  ${({ theme: { colors } }) => css`
    padding: 10px;
    background-color: ${colors.border};
  `}
`;
