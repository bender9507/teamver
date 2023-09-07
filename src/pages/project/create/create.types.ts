import type {
  ConstantAreaRow,
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "~/states/server/constant";

export interface ProjectCreateType {
  name: string;
  projectType: ConstantProjectTypeRow["id"];
  description: string;
  positions: ConstantPositionRow["id"][];
  recruitCount: string;
  languages: ConstantLanguageRow["id"][];
  skills: ConstantSkillRow["id"][];
  areas: ConstantAreaRow["id"][];
  imageUrl: File;
  startDate: Date | null | "미정";
  endDate: Date | null | "미정";
}
