import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { FlexColumn, Grid, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Role = () => {
  const {
    welcomeForm: { register },
    constants,
    currentLanguage
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <FlexColumn gap={16}>
        <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
          {t("환영합니다 회원님은 프로젝트의 모집자인가요 참가자인가요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("프로필에서 언제든 변경 가능해요")}
        </Text>
      </FlexColumn>

      <Grid column={2} gap={8}>
        {constants.roles.map((role) => (
          <SelectChip
            key={role.id}
            value={role.id}
            type="radio"
            size="large"
            {...register("role", { required: true })}
          >
            {role[currentLanguage]}
          </SelectChip>
        ))}
      </Grid>
    </FlexColumn>
  );
};
