import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useSelectFollows } from "~/states/server/profile";
import { FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { LikeOwnerCard } from "./LikeOwnerCard";

export const Owner = () => {
  const user = useUser() as User;
  const { data: follows } = useSelectFollows(user.id);
  const { t } = useTranslation("like");

  return (
    <>
      <Text as="h4" size="textLarge">
        {t("내가 찜한 팀원")}
      </Text>

      <PosCenter>
        {isEmpty(follows) && (
          <Text size="textMedium" color="gray6">
            {t("찜한 유저가 없어요")}
          </Text>
        )}
      </PosCenter>

      <FlexColumn gap={15} marginTop={16}>
        {follows.map((follow) => (
          <LikeOwnerCard data={follow} userId={user.id} key={follow.id} />
        ))}
      </FlexColumn>
    </>
  );
};
