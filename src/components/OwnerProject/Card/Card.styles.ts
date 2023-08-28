import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Image = styled.img`
  ${size({ width: 64, height: 64 })};

  border-radius: 7px;
`;
