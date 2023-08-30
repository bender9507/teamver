import type { PropsWithChildren } from "react";
import { LogoHeader, Navbar } from "~/components/Shared";
import * as Styled from "./LogoHeaderWithNavbarLayout.styles";

export const LogoHeaderWithNavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Container>
      <LogoHeader />

      <Styled.Main>{children}</Styled.Main>

      <Navbar />
    </Styled.Container>
  );
};
