import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Icon } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Navbar.styles";

export const Navbar = () => {
  const user = useUser();

  return (
    <Styled.Navbar>
      <Link href={routes.home}>
        <FlexCenter gap={4} direction="column">
          <Icon name="home" />
          <Text>Home</Text>
        </FlexCenter>
      </Link>

      <Link href={routes.chat}>
        <FlexCenter gap={4} direction="column">
          <Icon name="chat" />
          <Text>Chat</Text>
        </FlexCenter>
      </Link>

      <Link href={routes.like}>
        <FlexCenter gap={4} direction="column">
          <Icon name="list" />
          <Text>List</Text>
        </FlexCenter>
      </Link>

      <Link href={routes.profile(user?.id ?? "")}>
        <FlexCenter gap={4} direction="column">
          <Icon name="my" />
          <Text>My</Text>
        </FlexCenter>
      </Link>
    </Styled.Navbar>
  );
};
