import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { useSelectProfileQuery, useUpdateProfileMutate } from "~/states/server/profile";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import type { ProfileEditForm } from "./edit.types";
import type ProfileEdit from "./index.page";

export const useProfileEdit = ({ user }: ComponentProps<typeof ProfileEdit>) => {
  const router = useRouter();
  const { toast } = useDialog();

  const { t } = useTranslation("profile");

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: constant } = useSelectConstantsQuery();
  const { mutate: updateProfileMutate } = useUpdateProfileMutate({
    onSuccess: () => {
      router.push({ pathname: routes.profile, query: { userId: user.id } });
    }
  });
  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const { register, watch, control, handleSubmit } = useForm<ProfileEditForm>({
    defaultValues: {
      positions: profile.positions.map((position) => String(position.id)),
      projectTypes: profile.projectTypes.map((projectType) => String(projectType.id)),
      skills: profile.skills.map((skill) => String(skill.id)),
      languages: profile.languages.map((language) => String(language.id)),
      personalities: profile.personalities.map((personality) => String(personality.id)),
      job: String(profile.job.id),
      areas: profile.areas.map((area) => String(area.id)),
      name: profile.name,
      introduce: profile.introduce,
      blog: profile.blog
    }
  });

  const onSubmit = handleSubmit(
    async ({
      positions,
      languages,
      personalities,
      projectTypes,
      areas,
      skills,
      imageUrl,
      job,
      ...rest
    }) => {
      const mappings = {
        positions: positions.map((position) => Number(position)),
        languages: languages.map((language) => Number(language)),
        personalities: personalities.map((personality) => Number(personality)),
        projectTypes: projectTypes.map((projectType) => Number(projectType)),
        areas: areas.map((area) => Number(area)),
        skills: skills.map((skill) => Number(skill)),
        job: Number(job)
      };

      if (!imageUrl) {
        updateProfileMutate({
          positions: mappings.positions,
          languages: mappings.languages,
          personalities: mappings.personalities,
          projectTypes: mappings.projectTypes,
          areas: mappings.areas,
          skills: mappings.skills,
          job: mappings.job,
          id: profile.id,
          ...rest
        });
        return;
      }
      const { publicUrl } = await uploadProfileImageMutateAsync({
        file: imageUrl,
        name: `${profile.id}_${new Date().getTime()}`
      });

      updateProfileMutate({
        positions: mappings.positions,
        languages: mappings.languages,
        personalities: mappings.personalities,
        projectTypes: mappings.projectTypes,
        areas: mappings.areas,
        skills: mappings.skills,
        imageUrl: publicUrl,
        id: profile.id,
        ...rest
      });
    },
    () => {
      toast({ type: "warning", message: t("모든 항목을 입력해주세요") });
    }
  );

  return {
    profile,
    constant,
    watch,
    control,
    register,
    onSubmit
  };
};
