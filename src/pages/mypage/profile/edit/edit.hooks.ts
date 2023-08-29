import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useGetConstantQuery } from "~/states/server/constant";
import {
  profileKeys,
  useSelectProfileQuery,
  useUpdateProfileMutate
} from "~/states/server/profile";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import { uuid } from "~/utils";
import type { MyPageForm } from "./edit.types";

export const useEditProfile = (userId: string) => {
  const { data: profileData } = useSelectProfileQuery(userId);

  const { data: constant } = useGetConstantQuery([
    "areas",
    "jobs",
    "languages",
    "personalities",
    "positions",
    "projectTypes",
    "skills"
  ]);

  const { control, register, watch, handleSubmit, formState } = useForm<MyPageForm>({
    defaultValues: {
      positions: profileData.positions.map((position) => String(position.id)),
      projectTypes: profileData.projectTypes.map((projectType) => String(projectType.id)),
      skills: profileData.skills.map((skill) => String(skill.id)),
      languages: profileData.languages.map((language) => String(language.id)),
      personalities: profileData.personalities.map((personality) => String(personality.id)),
      job: String(profileData.job.id),
      areas: profileData.areas.map((area) => String(area.id)),
      name: profileData.name,
      introduce: profileData.introduce,
      blog: profileData.blog
    }
  });

  const queryClient = useQueryClient();
  const { alert, confirm } = useDialog();
  const router = useRouter();

  const { mutate } = useUpdateProfileMutate({
    onSuccess: async () => {
      queryClient.invalidateQueries(profileKeys.selectProfile(userId));
      await alert({ message: "저장완료" });
      router.push("/mypage");
    }
  });
  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const handleUpdateProfile: Parameters<typeof handleSubmit>[0] = async ({
    positions,
    languages,
    personalities,
    projectTypes,
    areas,
    skills,
    imageUrl,
    job,
    ...rest
  }: MyPageForm) => {
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
      mutate({
        positions: mappings.positions,
        languages: mappings.languages,
        personalities: mappings.personalities,
        projectTypes: mappings.projectTypes,
        areas: mappings.areas,
        skills: mappings.skills,
        job: mappings.job,
        id: profileData.id,
        ...rest
      });
      return;
    }
    const { publicUrl } = await uploadProfileImageMutateAsync({
      file: imageUrl,
      name: `${uuid()}_${new Date().getTime()}`
    });

    mutate({
      positions: mappings.positions,
      languages: mappings.languages,
      personalities: mappings.personalities,
      projectTypes: mappings.projectTypes,
      areas: mappings.areas,
      skills: mappings.skills,
      imageUrl: publicUrl,
      id: profileData.id,
      ...rest
    });
  };

  const handleBack = async () => {
    if (!(await confirm({ message: "작성한 내용이 사라집니다. 계속 진행하시겠습니까?" }))) {
      return;
    }
    router.back();
  };

  return {
    profileData,
    constant,
    control,
    register,
    watch,
    handleSubmit,
    handleUpdateProfile,
    formState,
    handleBack
  };
};
