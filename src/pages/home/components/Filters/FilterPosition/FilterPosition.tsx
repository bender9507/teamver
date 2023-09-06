import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { SelectChip, useModal } from "~/components/Commons";
import { useSelectConstantsQuery } from "~/states/server/constant";
import type { OneOfLanguage } from "~/types";
import { FilterBase } from "../FilterBase";
import type { FilterPositionProps } from "./FilterPosition.types";

export const FILTER_POSITION_MODAL = "FILTER_POSITION_MODAL";

export const FilterPosition = ({ selectedPositions, onSubmit }: FilterPositionProps) => {
  const { register, handleSubmit } = useForm<{ selectedPositions: number[] }>({
    defaultValues: {
      selectedPositions
    }
  });

  const { unmount } = useModal();
  const { data: constants } = useSelectConstantsQuery();
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <FilterBase
      title={t("어떤 포지션의 팀원을 원하시나요")}
      description={t("필요한 포지션을 선택해주세요 여러개 선택 가능해요")}
      items={constants.positions.map((position) => (
        <SelectChip
          key={position.id}
          value={position.id}
          color="backgroundPrimary"
          {...register("selectedPositions")}
        >
          {position[currentLanguage]}
        </SelectChip>
      ))}
      onSubmit={handleSubmit((data) => {
        onSubmit(data.selectedPositions);

        unmount(FILTER_POSITION_MODAL);
      })}
    />
  );
};
