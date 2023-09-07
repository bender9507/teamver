import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const ProjectType = () => {
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
          {t("도전해 보고 싶은 프로젝트 타입을 선택해볼까요")}
        </Text>

        <Text as="p" size="textSmallBold" color="gray9">
          {t("여러 개 선택 할 수 있어요")}
        </Text>
      </FlexColumn>

      <Flex gap={12} wrap="wrap">
        {constants.projectTypes.map((projectType) => (
          <SelectChip
            key={projectType.id}
            value={projectType.id}
            {...register("projectTypes", { required: true })}
          >
            {projectType[currentLanguage]}
          </SelectChip>
        ))}
      </Flex>
    </FlexColumn>
  );
};
