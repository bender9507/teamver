import type { ChangeEvent } from "react";
import { useState } from "react";
import type { FieldArray, UseFieldArrayReturn } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetConstantQuery } from "~/states/server/constant";
import { fieldsRule } from "./welcome.constants";
import type { WelcomeArrayFields, WelcomeForm } from "./welcome.types";

export const useWelcome = () => {
  const [step, setStep] = useState(0);

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

  const onCreateProfile: Parameters<typeof form.handleSubmit>[0] = async (data) => {
    console.log(data);
  };

  return {
    step,
    nextStep,
    prevStep,
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
