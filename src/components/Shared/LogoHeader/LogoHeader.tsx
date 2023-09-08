import Image from "next/image";
import Link from "next/link";
import { Icon } from "~/components/Commons";
import * as Styled from "./LogoHeader.styles";

export const LogoHeader = () => {
  return (
    <Styled.Header>
      <Image src="/images/teamver.svg" width={130} height={16} alt="teamver" />
      <Link href="/notice">
        <Icon name="bell" />
      </Link>
    </Styled.Header>
  );
};
