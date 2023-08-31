import { useState } from "react";
import { Avatar, Button, IconButton, ProfileDetail } from "~/components/Commons";
import type { ChatRequestOwnerRow } from "~/states/server/chat/types";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";
import { useLikeCardOwner } from "./LikeCardOwner.hooks";

interface LikeCardOwnerProps {
  data: {
    id: number;
    follow: ProfileAllDataRow;
    chatRequest: ChatRequestOwnerRow;
  };
  userId: string;
}

export const LikeCardOwner = ({ data, userId }: LikeCardOwnerProps) => {
  const app = useLikeCardOwner({ followId: data.id, userId });
  const [isChatRequested, setIsChatRequested] = useState<boolean>(false);
  console.log(data);

  return (
    <Styled.Card>
      <FlexCenter
        as="button"
        gap={10}
        onClick={() =>
          app.mount(<ProfileDetail profile={data.follow} filter={app.filteredData} />, {
            id: "LIKE_OWNER",
            type: "bottom"
          })
        }
      >
        <Avatar src={data.follow.imageUrl} size="medium" />
        <Text>{data.follow.name}</Text>
      </FlexCenter>

      <FlexCenter gap={10}>
        <Button size="small" onClick={() => setIsChatRequested((prev) => !prev)}>
          {isChatRequested ? "요청 취소" : "채팅 요청"}
        </Button>
        <IconButton
          type="button"
          name="bookmark"
          color="primary"
          onClick={app.handleDeleteFollow}
        />
      </FlexCenter>
    </Styled.Card>
  );
};
