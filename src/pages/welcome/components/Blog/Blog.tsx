import { useTranslation } from "next-i18next";
import { Input } from "~/components/Commons";
import { HTTP_REGEX } from "~/constants/regex";
import { FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Blog = () => {
  const {
    welcomeForm: { register }
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
        {t("운영 블로그가 있다면 알려주세요")}
      </Text>

      <Input
        {...register("blog", {
          pattern: HTTP_REGEX
        })}
        placeholder={t("블로그 주소")}
      />
    </FlexColumn>
  );
};
