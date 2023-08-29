import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Navbar = styled.nav`
  ${flex({ align: "center", justify: "around" })};

  ${({ theme: { sizes } }) => size({ height: sizes.height.navbar })};
`;
