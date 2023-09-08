import Image from "next/image";
import * as Styled from "./LogoHeader.styles";

export const LogoHeader = () => {
  return (
    <Styled.Header>
      <Image src="/images/teamver.png" width={58} height={21} alt="teamver" />
    </Styled.Header>
  );
};
