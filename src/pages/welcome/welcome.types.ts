import type {
  ConstantAreaRow,
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
  languages: ConstantLanguageRow[];
  skills: ConstantSkillRow[];
  positions: ConstantPositionRow[];
  projectTypes: ConstantProjectTypeRow[];
  personalities: ConstantPersonalityRow[];
  areas: ConstantAreaRow[];
  blog: string;
  jobs: number;
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

// import type { ConstantRoleRow } from "~/states/server/constant";

// export interface WelcomeForm {
//   name: string;
//   introduce: string;
//   languages: number[];
//   skills: number[];
//   positions: number[];
//   projectTypes: number[];
//   personalities: number[];
//   areas: number[];
//   blog: string;
//   jobs: number;
//   imageUrl: File;
//   role: ConstantRoleRow["id"];
// }

// export type WelcomeArrayFields = Pick<
//   WelcomeForm,
//   "languages" | "skills" | "positions" | "projectTypes" | "personalities" | "areas"
// >;

// export interface ProgressStyleProps {
//   current: number;
//   max: number;
// }
