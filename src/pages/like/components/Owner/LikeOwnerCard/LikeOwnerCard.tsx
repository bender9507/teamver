import { Avatar, Button, IconButton, ProfileDetail } from "~/components/Commons";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "../../Like.styles";
import { useLikeOwnerCard } from "./LikeOwnerCard.hooks";
import type { LikeOwnerCardProps } from "./LikeOwnerCard.types";

export const LikeOwnerCard = ({ data, userId }: LikeOwnerCardProps) => {
  const app = useLikeOwnerCard({ data, userId });

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

        <Text size="textMediumBold" width={113} textAlign="left" ellipsis>
          {data.follow.name}
        </Text>
      </FlexCenter>

      <FlexCenter gap={10}>
        <Button
          color="content1"
          bgColor="backgroundSecondary"
          size="small"
          disabled={data.chatRequest[data.chatRequest.length - 1]?.state === "GRANT"}
          onClick={app.handleRequest}
        >
          {app.requestState()}
        </Button>

        <IconButton type="button" name="bookmarkFill" onClick={app.handleDeleteFollow} />
      </FlexCenter>
    </Styled.Card>
  );
};
