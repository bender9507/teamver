import { Header, Navbar } from "~/components/Shared";
import type { PropsWithElement } from "~/types";
import * as Styled from "./OwnerNavbarLayout.styles";

export const OwnerNavbarLayout = ({ children }: PropsWithElement) => {
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
