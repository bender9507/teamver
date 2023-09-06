import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { SelectChip, useModal } from "~/components/Commons";
import { useSelectConstantsQuery } from "~/states/server/constant";
import type { OneOfLanguage } from "~/types";
import { FilterBase } from "../FilterBase";
import type { FilterProjectTypeProps } from "./FilterProjectType.types";

export const FILTER_AREA_MODAL = "FILTER_AREA_MODAL";

export const FilterArea = ({ selectedAreas, onSubmit }: FilterProjectTypeProps) => {
  const { register, handleSubmit } = useForm<{ areas: number[] }>({
    defaultValues: {
      areas: selectedAreas
    }
  });

  const { unmount } = useModal();
  const { data: constants } = useSelectConstantsQuery();
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <FilterBase
      title={t("프로젝트 활동 지역이 어디인가요")}
      description={t("주로 활동하는 지역을 선택해주세요 여러개 선택 가능해요")}
      items={constants.areas.map((area) => (
        <SelectChip key={area.id} value={area.id} color="backgroundPrimary" {...register("areas")}>
          {area[currentLanguage]}
        </SelectChip>
      ))}
      onSubmit={handleSubmit((data) => {
        onSubmit(data.areas);

        unmount(FILTER_AREA_MODAL);
      })}
    />
  );
};
