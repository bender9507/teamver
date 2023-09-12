import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, Button } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { Text } from "~/styles/mixins";
import * as Styled from "./ProfileBox.styles";
import type { ProjectCardBoxProps } from "./ProfileBox.types";

export const ProfileBox = ({ profile, isMine }: ProjectCardBoxProps) => {
  const { t } = useTranslation("profile");

  return (
    <Styled.ProfileContainer>
      <Avatar src={profile.imageUrl} size="large" priority />

      <Text size="titleSmall">{profile.name}</Text>

      {isMine && (
        <Link href={{ pathname: routes.profileEdit, query: { profileId: profile.id } }}>
          <Button size="medium" color="content1" bgColor="backgroundSecondary">
            {t("프로필 수정")}
          </Button>
        </Link>
      )}
    </Styled.ProfileContainer>
  );
};
