import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useSelectFollowProjectsQuery } from "~/states/server/project";
import { FlexColumn, Text } from "~/styles/mixins";
import { LikeCardMember } from "../LikeCardMember";

export const Member = () => {
  const user = useUser() as User;
  const { data: followProjects } = useSelectFollowProjectsQuery(user.id);
  const { t } = useTranslation("like");

  return (
    <>
      <Text as="h4" size="textLarge">
        {t("내가 찜한 프로젝트")}
      </Text>

      <FlexColumn gap={15} marginTop={16}>
        {followProjects.map((followProject) => (
          <LikeCardMember key={followProject.id} data={followProject} userId={user.id} />
        ))}
      </FlexColumn>
    </>
  );
};
