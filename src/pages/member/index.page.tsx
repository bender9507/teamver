import type { ReactElement } from "react";
import { MemberNavbarLayout } from "~/components/Layouts";
import { SizeBox, Text } from "~/styles/mixins";

const Member = () => {
  return (
    <SizeBox height={5000}>
      <Text>member</Text>
    </SizeBox>
  );
};

Member.getLayout = (page: ReactElement) => {
  return <MemberNavbarLayout>{page}</MemberNavbarLayout>;
};

export default Member;
