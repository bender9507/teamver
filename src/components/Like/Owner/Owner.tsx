import { useTranslation } from "next-i18next";
import { FlexColumn, Text } from "~/styles/mixins";

import { useSelectFollows } from "~/states/server/profile";
import { LikeCardOwner } from "../LikeCardOwner";

export const Owner = ({ userId }: { userId: string }) => {
  const { data: follows } = useSelectFollows(userId);
  const { t } = useTranslation("like");

  return (
    <>
      <Text as="h4" size="textLarge">
        {t("내가 찜한 팀원")}
      </Text>

      <FlexColumn gap={15} marginTop={16}>
        {follows.map((follow) => (
          <LikeCardOwner data={follow} userId={userId} key={follow.id} />
        ))}
      </FlexColumn>
    </>
  );
};
