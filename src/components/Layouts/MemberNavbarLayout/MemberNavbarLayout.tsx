import { Header, Navbar } from "~/components/Shared";
import type { PropsWithElement } from "~/types";
import * as Styled from "./MemberNavbarLayout.styles";

export const MemberNavbarLayout = ({ children }: PropsWithElement) => {
  return (
    <Styled.Container>
      <Header />

      <Styled.Main>{children}</Styled.Main>

      <Navbar
        navList={[
          { label: "Home", route: "/member", icon: "home" },
          { label: "Chat", route: "/owner/chat", icon: "chat" },
          { label: "List", route: "/owner/project", icon: "list" },
          { label: "My", route: "/mypage", icon: "my" }
        ]}
      />
    </Styled.Container>
  );
};
