import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { SelectChip, useModal } from "~/components/Commons";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { FilterBase } from "../FilterBase";
import type { FilterLanguageProps } from "./FilterLanguage.types";

export const FILTER_LANGUAGE_MODAL = "FILTER_LANGUAGE_MODAL";

export const FilterLanguage = ({ selectedLanguages, onSubmit }: FilterLanguageProps) => {
  const { register, handleSubmit } = useForm<{ selectedLanguages: number[] }>({
    defaultValues: {
      selectedLanguages
    }
  });

  const { unmount } = useModal();
  const { data: constants } = useSelectConstantsQuery();
  const { t } = useTranslation("home");

  return (
    <FilterBase
      title={t("어떤 주요 언어가 필요한가요")}
      description={t("프로젝트에 필요한 주요 언어를 선택해주세요")}
      items={constants.languages.map((languages) => (
        <SelectChip
          key={languages.id}
          value={languages.id}
          color="backgroundPrimary"
          {...register("selectedLanguages")}
        >
          {languages.name}
        </SelectChip>
      ))}
      onSubmit={handleSubmit((data) => {
        onSubmit(data.selectedLanguages);

        unmount(FILTER_LANGUAGE_MODAL);
      })}
    />
  );
};
