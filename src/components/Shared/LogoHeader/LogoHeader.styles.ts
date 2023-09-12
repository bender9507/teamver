import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Header = styled.header`
  ${flex({ align: "center", justify: "between" })};

  ${({ theme: { sizes } }) => size({ height: sizes.height.header })};

  padding: 0 18px;
`;
