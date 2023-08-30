import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ChangeEvent, ComponentProps } from "react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useGetConstantQuery } from "~/states/server/constant";
import { checkNameValidation, useInsertProfileMutate } from "~/states/server/profile";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import { debounce } from "~/utils";
import type Welcome from "./index.page";
import { requiredSteps, steps } from "./welcome.constants";
import type { WelcomeForm } from "./welcome.types";

export const useWelcome = ({ user }: ComponentProps<typeof Welcome>) => {
  const [step, setStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const route = useRouter();
  const { toast } = useDialog();
  const { t } = useTranslation("welcome");

  const { data: constants } = useGetConstantQuery([
    "areas",
    "languages",
    "skills",
    "projectTypes",
    "personalities",
    "jobs",
    "positions",
    "roles"
  ]);

  const { register, formState, handleSubmit, setError, clearErrors, setValue, control, watch } =
    useForm<WelcomeForm>({
      mode: "onChange",
      shouldFocusError: false
    });

  const { mutate: insertProfileMutate } = useInsertProfileMutate({
    onSuccess: () => {
      toast({ type: "success", message: t("환영합니다") });

      if (watch("role") === 1) {
        route.replace("/owner");
      } else {
        route.replace("/member");
      }
    },
    onError: () => {
      toast({ type: "error", message: t("프로필 생성에 실패하였습니다") });
    }
  });
  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const isDisabled = useMemo(() => {
    const requiredStep = requiredSteps.includes(steps[step]);

    if (requiredStep) {
      return !formState.dirtyFields[steps[step]] || !!formState.errors[steps[step]];
    }

    return !!formState.errors[steps[step]];
  }, [formState, step]);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleCreateProfile: Parameters<typeof handleSubmit>[0] = async ({ imageUrl, ...rest }) => {
    const { publicUrl } = await uploadProfileImageMutateAsync({
      file: imageUrl,
      name: `${rest.name}_${new Date().getTime()}`
    });

    insertProfileMutate({
      id: user.id,
      github: user.user_metadata.preferred_username,
      imageUrl: publicUrl,
      ...rest
    });
  };

  const validateNickName = debounce<({ target }: ChangeEvent<HTMLInputElement>) => void>(
    async ({ target: { value: nickname } }) => {
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

  return {
    step,
    nextStep,
    prevStep,
    register,
    handleCreateProfile,
    handleSubmit,
    validateNickName,
    isDisabled,
    constants,
    control,
    watch,
    successMessage,
    lastStep: steps.length - 1,
    errorMessage: formState.errors.name?.message
  };
};
