import { IconButton } from "~/components/Commons";
import { NavbarLayout } from "~/components/Layouts";
import { FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";
import { LikeCard } from "../LikeCard/LikeCard";
import { useOwner } from "./Owner.hooks";

export const Owner = ({ userId }: { userId: string }) => {
  const app = useOwner(userId);
  console.log(app.follows);
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
            <LikeCard data={follow} userId={userId} key={follow.id} />
          ))}
        </FlexColumn>
      </FlexColumn>
    </NavbarLayout>
  );
};
