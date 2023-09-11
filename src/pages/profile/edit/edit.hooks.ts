import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { useSelectConstantsQuery } from "~/states/server/constant";
import {
  checkNameValidation,
  useSelectProfileQuery,
  useUpdateProfileMutate
} from "~/states/server/profile";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import { debounce } from "~/utils";
import type { ProfileEditForm } from "./edit.types";

export const useProfileEdit = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const user = useUser() as User;
  const { toast, confirm } = useDialog();

  const { t } = useTranslation("profile");

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: constant } = useSelectConstantsQuery();

  const { mutate: updateProfileMutate } = useUpdateProfileMutate({
    onSuccess: () => {
      router.push({ pathname: routes.profile, query: { userId: user.id } });
    },
    onError: () => {
      toast({ type: "error", message: t("프로필 수정에 실패했습니다") });
    }
  });
  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const { register, watch, control, handleSubmit, setError, formState, clearErrors, setValue } =
    useForm<ProfileEditForm>({
      defaultValues: {
        name: profile.name,
        introduce: profile.introduce,
        positions: profile.positions.map((position) => String(position.id)),
        projectTypes: profile.projectTypes.map((projectType) => String(projectType.id)),
        skills: profile.skills.map((skill) => String(skill.id)),
        languages: profile.languages.map((language) => String(language.id)),
        personalities: profile.personalities.map((personality) => String(personality.id)),
        job: String(profile.job.id),
        areas: profile.areas.map((area) => String(area.id)),
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
      setIsSubmitting(true);
      const toNumberArray = (arr: string[]) => arr.map(Number);
      const mappings = {
        positions: toNumberArray(positions),
        languages: toNumberArray(languages),
        personalities: toNumberArray(personalities),
        projectTypes: toNumberArray(projectTypes),
        areas: toNumberArray(areas),
        skills: toNumberArray(skills),
        job: Number(job)
      };

      let publicUrl;

      if (imageUrl) {
        const uploadResult = await uploadProfileImageMutateAsync({
          file: imageUrl,
          name: `${profile.id}_${new Date().getTime()}`
        });
        publicUrl = uploadResult.publicUrl;
      }

      updateProfileMutate({
        ...mappings,
        ...(publicUrl ? { imageUrl: publicUrl } : {}),
        id: profile.id,
        ...rest
      });
    },
    () => {
      toast({ type: "warning", message: t("모든 항목을 입력해주세요") });
    }
  );

  const validateNickName = debounce<({ target }: ChangeEvent<HTMLInputElement>) => void>(
    async ({ target: { value } }) => {
      let nickname = value;

      if (nickname.length > 16) {
        nickname = nickname.slice(0, 16);
        setValue("name", nickname, { shouldDirty: true });
      }

      if (!nickname) {
        setSuccessMessage("");
        setError("name", { type: "required" });
        return;
      }

      setValue("name", nickname, { shouldDirty: true });

      const isValid = await checkNameValidation(nickname);

      if (isValid) {
        setSuccessMessage(t("최고의 닉네임이에요"));
        clearErrors("name");
      } else {
        setSuccessMessage("");
        setError("name", { type: "validate", message: t("앗 누군가 사용 중인 닉네임이에요") });
      }
    },
    300
  );

  const handleBack = async () => {
    const back = await confirm({
      title: t("프로필 수정을 취소할까요")
    });

    return back;
  };

  return {
    profile,
    constant,
    watch,
    control,
    register,
    onSubmit,
    confirm,
    successMessage,
    handleBack,
    errorMessage: formState.errors.name?.message,
    validateNickName,
    formState,
    isSubmitting
  };
};
