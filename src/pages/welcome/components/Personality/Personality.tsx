import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Personality = () => {
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
          {t("나를 잘 나타내는 키워드를 선택해볼까요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("최대 두 개까지 선택할 수 있어요")}
        </Text>
      </FlexColumn>

      <Flex gap={12} wrap="wrap">
        {constants.personalities.map((personality) => (
          <SelectChip
            key={personality.id}
            value={personality.id}
            {...register("personalities", {
              required: true,
              validate: (value) => value.length < 3
            })}
          >
            {personality[currentLanguage]}
          </SelectChip>
        ))}
      </Flex>
    </FlexColumn>
  );
};
