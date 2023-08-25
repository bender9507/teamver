import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { FieldArray, UseFieldArrayReturn } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useGetConstantQuery } from "~/states/server/constant";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import { fieldsRule } from "./Form.constants";
import type { WelcomeArrayFields, WelcomeForm } from "./Form.types";

export const useCreateForm = () => {
  const [step, setStep] = useState(0);

  const { toast } = useDialog();
  const { t } = useTranslation("welcome");
  const router = useRouter();
  const user = useUser();
  const form = useForm<WelcomeForm>();

  const languageFields = useFieldArray({
    control: form.control,
    name: "languages",
    rules: fieldsRule
  });

  const skillFields = useFieldArray({
    control: form.control,
    name: "skills",
    rules: fieldsRule
  });

  const projectTypeFields = useFieldArray({
    control: form.control,
    name: "projectTypes",
    rules: fieldsRule
  });

  const personalityFields = useFieldArray({
    control: form.control,
    name: "personalities",
    rules: fieldsRule
  });

  const jobFields = useFieldArray({
    control: form.control,
    name: "jobs",
    rules: fieldsRule
  });

  const areaFields = useFieldArray({
    control: form.control,
    name: "areas",
    rules: fieldsRule
  });

  const { data: constants } = useGetConstantQuery([
    "areas",
    "languages",
    "skills",
    "projectTypes",
    "personalities",
    "jobs"
  ]);

  //   const { mutate: createProfileMutate } = useCreateProfileMutate({
  //     onSuccess: () => {
  //       router.replace(routes.member);
  //     },
  //     onError: () => {
  //       toast({ type: "success", message: t("프로필 생성에 실패하였습니다.") });
  //     }
  //   });

  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 8));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const createHandleChange = <T extends keyof WelcomeArrayFields>(
    fieldsArray: UseFieldArrayReturn<WelcomeForm, T>,
    name: T
  ) => {
    return (event: ChangeEvent<HTMLInputElement>, item: WelcomeForm[typeof name][number]) => {
      const isChecked = event.target.checked;

      if (isChecked) {
        fieldsArray.append(item as FieldArray<WelcomeForm, typeof name>);
      } else {
        fieldsArray.remove(fieldsArray.fields.findIndex((_item) => Number(_item.id) === item.id));
      }
    };
  };

  const onChangeLanguageFields = createHandleChange(languageFields, "languages");

  const onChangeSkillFields = createHandleChange(skillFields, "skills");

  const onChangeProjectTypeFields = createHandleChange(projectTypeFields, "projectTypes");

  const onChangePersonalityFields = createHandleChange(personalityFields, "personalities");

  const onChangeAreaFields = createHandleChange(areaFields, "areas");

  const onChangeJobFields = createHandleChange(jobFields, "jobs");

  const onCreateProfile: Parameters<typeof form.handleSubmit>[0] = async (profile) => {
    if (!user) return;

    const {
      imageUrl: imageFile,
      languages,
      skills,
      areas,
      jobs,
      projectTypes,
      personalities,
      ...profiles
    } = profile;

    const { publicUrl: imageUrl } = await uploadProfileImageMutateAsync({
      file: imageFile,
      name: `${user.id}_${new Date().getTime()}_${imageFile.name}`
    });

    // createProfileMutate({
    //   profile: {
    //     id: user.id,
    //     github: user.user_metadata.preferred_username,
    //     ...profiles,
    //     imageUrl
    //   },
    //   languages: languages.map((language) => ({ userId: user.id, languageId: language.id })),
    //   skills: skills.map((skill) => ({ userId: user.id, skillId: skill.id })),
    //   areas: areas.map((area) => ({ userId: user.id, areaId: area.id })),
    //   jobs: jobs.map((job) => ({ userId: user.id, jobId: job.id })),
    //   projectTypes: projectTypes.map((projectType) => ({
    //     userId: user.id,
    //     projectTypeId: projectType.id
    //   })),
    //   personalities: personalities.map((personality) => ({
    //     userId: user.id,
    //     personalityId: personality.id
    //   }))
    // });
  };

  return {
    step,

    constants,
    form,
    onChangeLanguageFields,
    onChangeSkillFields,
    onChangeProjectTypeFields,
    onChangePersonalityFields,
    onChangeAreaFields,
    onChangeJobFields,
    onCreateProfile
  };
};
