import { Button } from "~/components/Commons";
import { signOut } from "~/states/server";
import { Flex, FlexColumn } from "~/styles/mixins";

const Member = () => {
  return (
    <FlexColumn gap={24}>
      <Flex>member</Flex>

      <Button onClick={() => signOut()}>로그아웃</Button>
    </FlexColumn>
  );
};

export default Member;
