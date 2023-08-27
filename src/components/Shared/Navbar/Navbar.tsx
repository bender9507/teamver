import Link from "next/link";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { Icon } from "~/components/Commons";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Navbar.styles";

export const Navbar = ({
  navList
}: {
  navList: {
    label: string;
    route: string;
    icon: ComponentProps<typeof Icon>["name"];
  }[];
}) => {
  const router = useRouter();

  return (
    <Styled.Navbar>
      {navList.map(({ label, route, icon }) => (
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
