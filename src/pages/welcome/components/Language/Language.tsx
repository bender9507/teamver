import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Language = () => {
  const {
    welcomeForm: { register },
    constants
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <FlexColumn gap={16}>
        <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
          {t("사용하는 주요 언어를 선택해 볼까요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("여러 개 선택 할 수 있어요")}
        </Text>
      </FlexColumn>

      <Flex gap={12} wrap="wrap">
        {constants.languages.map((language) => (
          <SelectChip
            key={language.id}
            value={language.id}
            {...register("languages", { required: true })}
          >
            {language.name}
          </SelectChip>
        ))}
      </Flex>
    </FlexColumn>
  );
};
