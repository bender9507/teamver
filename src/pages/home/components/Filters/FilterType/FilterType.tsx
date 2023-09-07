import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { SelectChip, useModal } from "~/components/Commons";
import { useSelectConstantsQuery } from "~/states/server/constant";
import type { OneOfLanguage } from "~/types";
import { FilterBase } from "../FilterBase";
import type { FilterTypeProps } from "./FilterType.types";

export const FILTER_TYPE_MODAL = "FILTER_TYPE_MODAL";

export const FilterType = ({ selectedType, onSubmit }: FilterTypeProps) => {
  const { register, handleSubmit } = useForm<{ selectedType: number }>({
    defaultValues: {
      selectedType
    }
  });

  const { unmount } = useModal();
  const { data: constants } = useSelectConstantsQuery();
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <FilterBase
      title={t("어떤 프로젝트를 찾으시나요")}
      description={t("도전해보고 싶은 프로젝트 타입을 선택해주세요")}
      items={constants.projectTypes.map((projectType) => (
        <SelectChip
          key={projectType.id}
          type="radio"
          value={projectType.id}
          color="backgroundPrimary"
          {...register("selectedType")}
        >
          {projectType[currentLanguage]}
        </SelectChip>
      ))}
      onSubmit={handleSubmit((data) => {
        onSubmit(data.selectedType);

        unmount(FILTER_TYPE_MODAL);
      })}
    />
  );
};
