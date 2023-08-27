import Image from "next/image";
import type { ReactElement } from "react";
import { TinderCard } from "~/components/Commons";
import { MemberNavbarLayout } from "~/components/Layouts";
import * as Styled from "./member.styles";

const Member = () => {
  return (
    <Styled.Container>
      <TinderCard onConfirm={() => console.log("confirm")} onCancel={() => console.log("cancel")}>
        <Image
          src="https://knjzcsrhngnomfeoymis.supabase.co/storage/v1/object/public/profileImages/g123_1693107111237"
          fill
          sizes="100%"
          alt="ㅇㅇㅇ"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "24px"
          }}
        />
      </TinderCard>
    </Styled.Container>
  );
};

Member.getLayout = (page: ReactElement) => {
  return <MemberNavbarLayout>{page}</MemberNavbarLayout>;
};

export default Member;
