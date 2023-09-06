import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Area = () => {
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
          {t("주로 활동하는 지역은 어디인가요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("여러 개 선택 할 수 있어요")}
        </Text>
      </FlexColumn>

      <Flex gap={10} wrap="wrap">
        {constants.areas.map((area) => (
          <SelectChip
            key={area.id}
            value={area.id}
            {...register("areas", { required: true, maxLength: 2 })}
          >
            {area[currentLanguage]}
          </SelectChip>
        ))}
      </Flex>
    </FlexColumn>
  );
};
