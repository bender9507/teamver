import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "~/states/server/constant";

export interface WelcomeForm {
  name: string;
  introduce: string;
  languages: ConstantLanguageRow[];
  skills: ConstantSkillRow[];
  positions: ConstantPositionRow[];
  projectTypes: ConstantProjectTypeRow[];
  personalities: ConstantPersonalityRow[];
  areas: ConstantAreaRow[];
  blog: string;
  jobs: ConstantJobRow[];
  imageUrl: File;
  role: boolean;
}

export type WelcomeArrayFields = Pick<
  WelcomeForm,
  "languages" | "skills" | "positions" | "projectTypes" | "personalities" | "areas" | "jobs"
>;

export interface ProgressStyleProps {
  current: number;
  max: number;
}
