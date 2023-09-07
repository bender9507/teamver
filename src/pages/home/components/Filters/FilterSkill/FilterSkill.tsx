import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { SelectChip, useModal } from "~/components/Commons";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { FilterBase } from "../FilterBase";
import type { FilterSkillProps } from "./FilterSkill.types";

export const FILTER_SKILL_MODAL = "FILTER_SKILL_MODAL";

export const FilterSkill = ({ selectedSkills, onSubmit }: FilterSkillProps) => {
  const { register, handleSubmit } = useForm<{ selectedSkills: number[] }>({
    defaultValues: {
      selectedSkills
    }
  });

  const { unmount } = useModal();
  const { data: constants } = useSelectConstantsQuery();
  const { t } = useTranslation("home");

  return (
    <FilterBase
      title={t("어떤 기술 스택이 필요한가요")}
      description={t("프로젝트를 수행함에 있어 필요한 기술 스택을 선택해주세요")}
      items={constants.skills.map((skill) => (
        <SelectChip
          key={skill.id}
          value={skill.id}
          color="backgroundPrimary"
          {...register("selectedSkills")}
        >
          {skill.name}
        </SelectChip>
      ))}
      onSubmit={handleSubmit((data) => {
        onSubmit(data.selectedSkills);

        unmount(FILTER_SKILL_MODAL);
      })}
    />
  );
};
