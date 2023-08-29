import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "~/components/Commons";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Navbar.styles";

const list = [
  { label: "Home", route: "/home", icon: "home" },
  { label: "Chat", route: "/chat", icon: "chat" },
  { label: "List", route: "/like", icon: "list" },
  { label: "My", route: "/profile", icon: "my" }
] as const;

export const Navbar = () => {
  const router = useRouter();

  return (
    <Styled.Navbar>
      {list.map(({ label, route, icon }) => (
        <Link href={route} key={route}>
          <FlexCenter gap={4} direction="column">
            <Icon
              name={icon}
              width={27}
              height={27}
              color={router.pathname.includes(route) ? "primary" : "white"}
            />
            <Text size="paragraph3" color={router.pathname.includes(route) ? "primary" : "white"}>
              {label}
            </Text>
          </FlexCenter>
        </Link>
      ))}
    </Styled.Navbar>
  );
};
