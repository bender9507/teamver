import { useTranslation } from "next-i18next";
import { Button } from "~/components/Commons";
import { CommonContainer, Flex, FlexColumn, SizeBox, Text } from "~/styles/mixins";
import type { FilterBaseProps } from "./FilterBase.types";

export const FilterBase = ({ title, description, items, onSubmit }: FilterBaseProps) => {
  const { t } = useTranslation("home");

  return (
    <CommonContainer as="form" onSubmit={onSubmit}>
      <FlexColumn gap={12}>
        <Text size="titleMedium">{title}</Text>
        <Text size="paragraph3" color="gray9">
          {description}
        </Text>
      </FlexColumn>

      <SizeBox height={34} />

      <Flex gap={8} wrap="wrap">
        {items}
      </Flex>

      <SizeBox height={60} />

      <Button>{t("확인")}</Button>
    </CommonContainer>
  );
};
