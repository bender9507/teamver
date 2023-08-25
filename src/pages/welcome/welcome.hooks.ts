import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import type { FieldArray, UseFieldArrayReturn } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetConstantQuery } from "~/states/server/constant";
import { checkNameValidation } from "~/states/server/profile";
import { debounce } from "~/utils";
import { requiredSteps, rules, steps } from "./welcome.constants";
import type { WelcomeArrayFields, WelcomeForm } from "./welcome.types";

export const useWelcome = () => {
  const [step, setStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const { data: constants } = useGetConstantQuery([
    "areas",
    "languages",
    "skills",
    "projectTypes",
    "personalities",
    "jobs",
    "positions"
  ]);

  const { register, formState, handleSubmit, setError, clearErrors, setValue, control } =
    useForm<WelcomeForm>({
      mode: "onChange",
      shouldFocusError: false
    });

  const languageFields = useFieldArray({ control, rules, name: "languages" });
  const skillFields = useFieldArray({ control, rules, name: "skills" });
  const positionFields = useFieldArray({ control, rules, name: "positions" });
  const projectTypeFields = useFieldArray({ control, rules, name: "projectTypes" });
  const personalityFields = useFieldArray({
    control,
    rules: { ...rules, maxLength: 2 },
    name: "personalities"
  });
  const areaFields = useFieldArray({ control, rules, name: "areas" });
  const jobFields = useFieldArray({ control, rules: { ...rules, maxLength: 1 }, name: "jobs" });

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
        setSuccessMessage("최고의 닉네임이에요!");
        clearErrors("name");
      } else {
        setSuccessMessage("");
        setError("name", { type: "validate", message: "앗! 누군가 사용 중인 닉네임이에요!" });
      }
    },
    300
  );

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

  const onChange = {
    languageFields: createHandleChange(languageFields, "languages"),
    skillFields: createHandleChange(skillFields, "skills"),
    positionFields: createHandleChange(positionFields, "positions"),
    projectTypeFields: createHandleChange(projectTypeFields, "projectTypes"),
    personalityFields: createHandleChange(personalityFields, "personalities"),
    areaFields: createHandleChange(areaFields, "areas"),
    jobFields: createHandleChange(jobFields, "jobs")
  };

  return {
    step,
    nextStep,
    prevStep,
    register,
    handleCreateProfile,
    handleSubmit,
    validateNickName,
    isDisabled,
    formState,
    constants,
    successMessage,
    errorMessage: formState.errors.name?.message,
    onChange
  };
};
