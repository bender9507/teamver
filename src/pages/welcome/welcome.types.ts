import type { UseFormRegister } from "react-hook-form";
import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "~/states/server/constant";

export interface WelcomeForm {
  name: string;
  introduce: string;
  imageUrl: File;
  languages: ConstantLanguageRow[];
  skills: ConstantSkillRow[];
  projectTypes: ConstantProjectTypeRow[];
  personalities: ConstantPersonalityRow[];
  areas: ConstantAreaRow[];
  jobs: ConstantJobRow[];
}

export type WelcomeArrayFields = Pick<
  WelcomeForm,
  "languages" | "skills" | "projectTypes" | "personalities" | "areas" | "jobs"
>;

export interface WelcomeContextValue {
  step: number;
  nextStep: VoidFunction;
  prevStep: VoidFunction;
  register: UseFormRegister<WelcomeForm>;
}

export interface ProgressStyleProps {
  current: number;
  max: number;
}
