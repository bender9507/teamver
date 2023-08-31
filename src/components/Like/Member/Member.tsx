import { useTranslation } from "next-i18next";
import { IconButton } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";

import { LikeCardMember } from "../LikeCardMember";
import { useMember } from "./Member.hooks";

export const Member = ({ userId }: { userId: string }) => {
  const app = useMember(userId);
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
        {t("내가 찜한 프로젝트")}
      </Text>

      <FlexColumn gap={15}>
        {app.followProjects.map((followProject) => (
          <LikeCardMember key={followProject.id} data={followProject} userId={userId} />
        ))}
      </FlexColumn>
    </Styled.Container>
  );
};
