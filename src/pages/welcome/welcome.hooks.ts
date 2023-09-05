import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { useInsertProfileMutate } from "~/states/server/profile";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import type { OneOfLanguage } from "~/types";
import { uuid } from "~/utils";
import { requiredSteps, steps } from "./welcome.constants";
import type { WelcomeForm } from "./welcome.types";

export const useWelcome = () => {
  const [step, setStep] = useState(0);

  const user = useUser() as User;

  const route = useRouter();
  const { toast } = useDialog();
  const { t, i18n } = useTranslation("welcome");
  const { data: constants } = useSelectConstantsQuery();

  const welcomeForm = useForm<WelcomeForm>({
    mode: "onChange",
    shouldFocusError: false
  });

  const { handleSubmit, formState, register } = welcomeForm;

  const currentLanguage = i18n.language as OneOfLanguage;

  const values = useMemo(
    () => ({
      constants,
      welcomeForm,
      currentLanguage
    }),
    [constants, currentLanguage, welcomeForm]
  );

  const { mutate: insertProfileMutate } = useInsertProfileMutate({
    onSuccess: () => {
      toast({ type: "success", message: t("환영합니다") });

      route.replace(routes.main);
    },
    onError: () => {
      toast({ type: "error", message: t("프로필 생성에 실패하였습니다") });
    }
  });
  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleCreateProfile = handleSubmit(async ({ imageUrl, ...rest }) => {
    const { publicUrl } = await uploadProfileImageMutateAsync({
      file: imageUrl,
      name: uuid()
    });

    insertProfileMutate({
      id: user.id,
      github: user.user_metadata.preferred_username,
      imageUrl: publicUrl,
      ...rest
    });
  });

  const isDisabled = useMemo(() => {
    const requiredStep = requiredSteps.includes(steps[step]);

    if (requiredStep) {
      return !formState.dirtyFields[steps[step]] || !!formState.errors[steps[step]];
    }

    return !!formState.errors[steps[step]];
  }, [formState, step]);

  return {
    step,
    values,
    nextStep,
    prevStep,
    register,
    handleCreateProfile,
    isDisabled,
    lastStep: steps.length - 1
  };
};
