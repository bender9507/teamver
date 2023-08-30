import type { PropsWithChildren } from "react";
import { Navbar } from "~/components/Shared";
import * as Styled from "./NavbarLayout.styles";

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Container>
      <Styled.Main>{children}</Styled.Main>

      <Navbar />
    </Styled.Container>
  );
};
