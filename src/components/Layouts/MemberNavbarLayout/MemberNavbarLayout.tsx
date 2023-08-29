import type { PropsWithChildren } from "react";
import { Header, Navbar } from "~/components/Shared";
import * as Styled from "./MemberNavbarLayout.styles";

export const MemberNavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Container>
      <Header />

      <Styled.Main>{children}</Styled.Main>

      <Navbar
        navList={[
          { label: "Home", route: "/member", icon: "home" },
          { label: "Chat", route: "/member/chat", icon: "chat" },
          { label: "List", route: "/member/project", icon: "list" },
          { label: "My", route: "/mypage", icon: "my" }
        ]}
      />
    </Styled.Container>
  );
};
