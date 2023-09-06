import { useTranslation } from "next-i18next";
import { Input } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useName } from "./Name.hooks";

export const Name = () => {
  const app = useName();
  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <FlexColumn gap={16}>
        <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
          {t("팀버에서만의 닉네임을 만들어보세요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9" whiteSpace="pre-wrap">
          {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
        </Text>
      </FlexColumn>

      <FlexColumn gap={14}>
        <Input
          {...app.register("name")}
          onChange={app.validateNickName}
          maxLength={16}
          placeholder={t("닉네임")}
        />

        <Flex style={{ marginLeft: "18px" }}>
          {!app.successMessage && !app.errorMessage && (
            <Text color="gray4" size="textMediumBold">
              {t("최대 N글자", { count: 16 })}
            </Text>
          )}
          {app.successMessage && (
            <Text color="primary" size="textMediumBold">
              {app.successMessage}
            </Text>
          )}
          {app.errorMessage && (
            <Text color="error" size="textMediumBold">
              {app.errorMessage}
            </Text>
          )}
        </Flex>
      </FlexColumn>
    </FlexColumn>
  );
};
