import type {
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "~/states/server/constant";

export interface ProjectEditForm {
  name: string;
  projectType: ConstantProjectTypeRow["id"];
  description: string;
  positions: ConstantPositionRow["id"][];
  recruitCount: string;
  languages: ConstantLanguageRow["id"][];
  skills: ConstantSkillRow["id"][];
  imageUrl: File;
  startDate: Date | null;
  endDate: Date | null;
}
