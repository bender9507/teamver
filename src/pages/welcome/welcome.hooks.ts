import { useTranslation } from "next-i18next";
import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetConstantQuery } from "~/states/server/constant";
import { checkNameValidation } from "~/states/server/profile";
import { debounce } from "~/utils";
import { requiredSteps, steps } from "./welcome.constants";
import type { WelcomeForm } from "./welcome.types";

export const useWelcome = () => {
  const [step, setStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
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

  const handleCreateProfile: Parameters<typeof handleSubmit>[0] = (props) => {
    console.log(props);
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
    errorMessage: formState.errors.name?.message
  };
};
