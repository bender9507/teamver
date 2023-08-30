import { Avatar, Button, IconButton, ProfileDetail } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";
import { useOwner } from "./Owner.hooks";

export const Owner = ({ userId }: { userId: string }) => {
  const app = useOwner(userId);
  return (
    <NavbarLayout>
      <FlexColumn style={{ padding: "20px" }}>
        <Styled.Header>
          <IconButton type="button" name="arrowBack" color="content1" onClick={app.handleBack} />

          <Text style={{ margin: "0 auto" }} as="h3" size="heading3">
            찜 목록
          </Text>
        </Styled.Header>

        <Text as="h4" size="heading4" style={{ margin: "40px 0 20px 0" }}>
          내가 찜한 팀원
        </Text>

        <FlexColumn gap={15}>
          {app.follows.map((follow) => (
            <Styled.Card key={follow.id}>
              <FlexCenter
                as="button"
                gap={10}
                onClick={() =>
                  app.mount(<ProfileDetail profile={follow} filter={app.filteredData} />, {
                    id: "LIKE_OWNER",
                    type: "bottom"
                  })
                }
              >
                <Avatar src={follow.imageUrl} size="medium" />
                <Text>{follow.name}</Text>
              </FlexCenter>

              <FlexCenter gap={10}>
                <Button size="small">채팅 요청</Button>
                <IconButton type="button" name="bookmark" color="content1" />
              </FlexCenter>
            </Styled.Card>
          ))}
        </FlexColumn>
      </FlexColumn>
    </NavbarLayout>
  );
};
