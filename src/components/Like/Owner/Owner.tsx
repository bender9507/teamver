import { useTranslation } from "next-i18next";
import { IconButton } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";

import { LikeCardOwner } from "../LikeCardOwner";
import { useOwner } from "./Owner.hooks";

export const Owner = ({ userId }: { userId: string }) => {
  const app = useOwner(userId);
  const { t } = useTranslation("like");

  return (
    <Styled.Container>
      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content1" onClick={app.handleBack} />

        <Text style={{ margin: "0 auto" }} as="h3" size="heading3">
          {t("찜 목록")}
        </Text>
      </Styled.Header>

      <Text as="h4" size="heading4" style={{ margin: "40px 0 20px 0" }}>
        {t("내가 찜한 팀원")}
      </Text>

      <FlexColumn gap={15}>
        {app.follows.map((follow) => (
          <LikeCardOwner data={follow} userId={userId} key={follow.id} />
        ))}
      </FlexColumn>
    </Styled.Container>
  );
};
