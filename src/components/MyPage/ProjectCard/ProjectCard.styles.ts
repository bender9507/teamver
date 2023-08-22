import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";


export const ProjectCard = styled.div`
  ${flex({ justify: "between", align: "center" })}
  ${size({ width: "100%" })}
  padding: 10px;
  background-color: #d9d9d9;
`;