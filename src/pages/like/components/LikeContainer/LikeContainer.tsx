import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useSelectFollows } from "~/states/server/profile";
import { useSelectFollowProjectsQuery } from "~/states/server/project";
import { FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { LikeMemberCard } from "../Member";
import { LikeOwnerCard } from "../Owner";

export const LikeContainer = ({ role }: { role: number }) => {
  const user = useUser() as User;
  const { data: follows } = useSelectFollows(user.id);
  const { data: followProjects } = useSelectFollowProjectsQuery(user.id);
  const { t } = useTranslation("like");

  return (
    <>
      <Text as="h4" size="textLarge">
        {role === 1 ? t("내가 찜한 팀원") : t("내가 찜한 프로젝트")}
      </Text>

      <PosCenter>
        {isEmpty(role === 1 ? follows : followProjects) && (
          <Text size="textMedium" color="gray6">
            {role === 1 ? t("찜한 유저가 없어요") : t("찜한 프로젝트가 없어요")}
          </Text>
        )}
        {/* {isEmpty(follows) && (
          <Text size="textMedium" color="gray6">
            {t("찜한 유저가 없어요")}
          </Text>
        )} */}
      </PosCenter>

      <FlexColumn gap={15} marginTop={16}>
        {role === 1
          ? follows.map((follow) => (
              <LikeOwnerCard data={follow} userId={user.id} key={follow.id} />
            ))
          : followProjects.map((followProject) => (
              <LikeMemberCard data={followProject} userId={user.id} key={followProject.id} />
            ))}
        {/* {follows.map((follow) => (
          <LikeOwnerCard data={follow} userId={user.id} key={follow.id} />
        ))} */}
      </FlexColumn>
    </>
  );
};
