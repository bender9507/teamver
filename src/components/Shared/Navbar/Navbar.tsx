import type { User } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "~/components/Commons";
import { routes } from "~/constants/routes";
import * as Styled from "./Navbar.styles";

export const Navbar = ({ user }: { user: User }) => {
  const { pathname } = useRouter();

  return (
    <Styled.Navbar>
      <Link href={routes.main}>
        <Icon name={pathname.startsWith(routes.main) ? "homeFill" : "home"} />
      </Link>

      <Link href={routes.chat}>
        <Icon name={pathname.startsWith(routes.chat) ? "chatFill" : "chat"} />
      </Link>

      <Link href={routes.like}>
        <Icon name={pathname.startsWith(routes.like) ? "likeFill" : "like"} />
      </Link>

      <Link href={routes.profile(user.id)}>
        <Icon name={pathname.startsWith("/profile") ? "profileFill" : "profile"} />
      </Link>
    </Styled.Navbar>
  );
};
