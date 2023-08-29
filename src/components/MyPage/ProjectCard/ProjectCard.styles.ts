import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const ProjectCard = styled.div`
  ${flex({ justify: "start", align: "center", gap: 10 })};

  ${size({ width: "100%" })};

  padding: 10px;
`;
