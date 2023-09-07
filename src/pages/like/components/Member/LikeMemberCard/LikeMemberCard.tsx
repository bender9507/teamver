import { Avatar, Button, IconButton, ProjectDetail } from "~/components/Commons";

import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "../../Like.styles";
import { useLikeMemberCard } from "./LikeMemberCard.hooks";
import type { LikeMemberCardProps } from "./LikeMemberCard.types";

export const LikeMemberCard = ({ data, userId }: LikeMemberCardProps) => {
  const app = useLikeMemberCard({ data, userId });

  return (
    <Styled.Card>
      <FlexCenter
        as="button"
        gap={10}
        onClick={() =>
          app.mount(<ProjectDetail profile={app.profile} project={data.project} />, {
            id: "LIKE_OWNER",
            type: "bottom"
          })
        }
      >
        <Avatar src={data.project.imageUrl} size="medium" />

        <Text size="textMediumBold" width={113} textAlign="left" ellipsis>
          {data.project.name}
        </Text>
      </FlexCenter>

      <FlexCenter gap={10}>
        <Button
          size="small"
          color="content1"
          bgColor="backgroundSecondary"
          disabled={data.chatRequest[data.chatRequest.length - 1]?.state === "GRANT"}
          onClick={app.handleRequest}
        >
          {app.requestState()}
        </Button>

        <IconButton type="button" name="bookmarkFill" onClick={app.handleDeleteFollowProject} />
      </FlexCenter>
    </Styled.Card>
  );
};
