import type { PropsWithChildren } from "react";
import { Header, Navbar } from "~/components/Shared";
import * as Styled from "./OwnerNavbarLayout.styles";

export const OwnerNavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Container>
      <Header />

      <Styled.Main>{children}</Styled.Main>

      <Navbar
        navList={[
          { label: "Home", route: "/owner", icon: "home" },
          { label: "Chat", route: "/owner/chat", icon: "chat" },
          { label: "List", route: "/owner/project", icon: "list" },
          { label: "My", route: "/mypage", icon: "my" }
        ]}
      />
    </Styled.Container>
  );
};
