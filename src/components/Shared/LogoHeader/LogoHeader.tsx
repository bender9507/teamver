import Image from "next/image";
import * as Styled from "./LogoHeader.styles";

export const LogoHeader = () => {
  return (
    <Styled.Header>
      <Image src="/images/teamver.svg" width={130} height={16} alt="teamver" />
    </Styled.Header>
  );
};
