import { useTranslation } from "next-i18next";
import { FlexColumn, Text } from "~/styles/mixins";

import { useSelectFollowProjectsQuery } from "~/states/server/project";
import { LikeCardMember } from "../LikeCardMember";

export const Member = ({ userId }: { userId: string }) => {
  const { data: followProjects } = useSelectFollowProjectsQuery(userId);
  const { t } = useTranslation("like");

  return (
    <>
      <Text as="h4" size="textLarge">
        {t("내가 찜한 프로젝트")}
      </Text>

      <FlexColumn gap={15} marginTop={16}>
        {followProjects.map((followProject) => (
          <LikeCardMember key={followProject.id} data={followProject} userId={userId} />
        ))}
      </FlexColumn>
    </>
  );
};
