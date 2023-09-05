import { useTranslation } from "next-i18next";
import { SelectChip } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useWelcomeContext } from "../../index.page";

export const Job = () => {
  const {
    welcomeForm: { register },
    constants,
    currentLanguage
  } = useWelcomeContext();

  const { t } = useTranslation("welcome");

  return (
    <FlexColumn gap={70} flex={1}>
      <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
        {t("거의 다 왔어요 어떤 일을 하고 계시나요")}
      </Text>

      <Flex gap={12} wrap="wrap">
        {constants.jobs.map((job) => (
          <SelectChip
            key={job.id}
            type="radio"
            value={job.id}
            {...register("job", { required: true })}
          >
            {job[currentLanguage]}
          </SelectChip>
        ))}
      </Flex>
    </FlexColumn>
  );
};
