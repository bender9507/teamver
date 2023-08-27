import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantRoleRow,
  ConstantSkillRow
} from "~/states/server/constant";

export interface WelcomeForm {
  name: string;
  introduce: string;
  languages: ConstantLanguageRow["id"][];
  skills: ConstantSkillRow["id"][];
  positions: ConstantPositionRow["id"][];
  projectTypes: ConstantProjectTypeRow["id"][];
  personalities: ConstantPersonalityRow["id"][];
  areas: ConstantAreaRow["id"][];
  blog: string;
  job: ConstantJobRow["id"];
  imageUrl: File;
  role: ConstantRoleRow["id"];
}

export type WelcomeArrayFields = Pick<
  WelcomeForm,
  "languages" | "skills" | "positions" | "projectTypes" | "personalities" | "areas"
>;

export interface ProgressStyleProps {
  current: number;
  max: number;
}
