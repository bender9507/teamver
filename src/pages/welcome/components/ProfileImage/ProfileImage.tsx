import { useTranslation } from "next-i18next";
import { Controller } from "react-hook-form";
import { Icon, ImageUploader } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";
import * as Styled from "./ProfileImage.styles";

export const ProfileImage = () => {
  const {
    welcomeForm: { watch, control }
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <Text as="h3" size="titleLarge">
        {t("마지막으로 나를 나타낼 수 있는 프로필 사진을 올려볼까요")}
      </Text>

      <Controller
        name="imageUrl"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <ImageUploader onChange={onChange} style={{ marginBottom: "48px" }}>
            <Styled.ProfileCardContainer>
              {watch("imageUrl") ? (
                <Styled.ProfileImage
                  fill
                  sizes="100%"
                  src={URL.createObjectURL(watch("imageUrl"))}
                  alt="profile image"
                />
              ) : (
                <Styled.ProfileAddButton>
                  <Icon name="add" color="white" />
                </Styled.ProfileAddButton>
              )}

              <Styled.Gradient />

              <Styled.ProfileDesc gap={16}>
                <Text size="titleSmall">{watch("name")}</Text>

                <Text size="textSmall" color="content2">
                  {watch("introduce")}
                </Text>
              </Styled.ProfileDesc>
            </Styled.ProfileCardContainer>
          </ImageUploader>
        )}
      />
    </FlexColumn>
  );
};
