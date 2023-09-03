import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useSelectFollows } from "~/states/server/profile";
import { FlexColumn, Text } from "~/styles/mixins";
import { LikeCardOwner } from "../LikeCardOwner";

export const Owner = () => {
  const user = useUser() as User;
  const { data: follows } = useSelectFollows(user.id);
  const { t } = useTranslation("like");

  return (
    <>
      <Text as="h4" size="textLarge">
        {t("내가 찜한 팀원")}
      </Text>

      <FlexColumn gap={15} marginTop={16}>
        {follows.map((follow) => (
          <LikeCardOwner data={follow} userId={user.id} key={follow.id} />
        ))}
      </FlexColumn>
    </>
  );
};
