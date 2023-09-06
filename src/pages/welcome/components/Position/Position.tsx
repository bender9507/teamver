import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Position = () => {
  const {
    welcomeForm: { register },
    constants,
    currentLanguage
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <FlexColumn gap={16}>
        <Text as="h3" size="titleLarge">
          {t("나의 포지션을 선택해볼까요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("여러 개 선택 할 수 있어요")}
        </Text>
      </FlexColumn>

      <Flex gap={12} wrap="wrap">
        {constants.positions.map((position) => (
          <SelectChip
            key={position.id}
            value={position.id}
            {...register("positions", { required: true })}
          >
            {position[currentLanguage]}
          </SelectChip>
        ))}
      </Flex>
    </FlexColumn>
  );
};
