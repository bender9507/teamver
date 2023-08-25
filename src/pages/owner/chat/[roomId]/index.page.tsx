import { useRouter } from "next/router";
import { Button, PreviousButton } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "./ChatRoom.styles";

const ChatRoom = () => {
  const router = useRouter();

  const memberData =
    typeof router.query.memberData === "string" ? JSON.parse(router.query.memberData) : undefined;

  return (
    <FlexColumn>
      <Styled.ChatRoomTopBar>
        <PreviousButton />
        <Text>상대방이름</Text>
        <Button>팀원으로초대하기</Button>
      </Styled.ChatRoomTopBar>
    </FlexColumn>
  );
};

export default ChatRoom;
