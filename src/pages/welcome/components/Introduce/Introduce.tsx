import { useTranslation } from "next-i18next";
import { Textarea } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Introduce = () => {
  const {
    welcomeForm: { register }
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <FlexColumn gap={16}>
        <Text as="h3" size="titleLarge">
          {t("멋진 소개글을 적어볼까요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
        </Text>
      </FlexColumn>

      <FlexColumn gap={14}>
        <Textarea
          {...register("introduce", { required: true, maxLength: 500 })}
          maxLength={500}
          placeholder={t("내 소개")}
        />

        <Text color="gray4" size="textMediumBold" style={{ marginLeft: "18px" }}>
          {t("최대 N자", { count: 500 })}
        </Text>
      </FlexColumn>
    </FlexColumn>
  );
};
