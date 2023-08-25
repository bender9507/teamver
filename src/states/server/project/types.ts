import type {
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "../constant";
import type { ProfileAllDataRow } from "../profile";
import type { Table } from "../server.types";

export type ProjectDataRow = Table["projects"]["Row"];

export type ProjectMembersRow = Table["projectMembers"]["Row"];

export type ProjectDataInsert = Table["projects"]["Insert"];

export type ProjectAllDataRow = ProjectDataRow & {
  projectTypes: ConstantProjectTypeRow[];
  skills: ConstantSkillRow[];
  positions: ConstantPositionRow[];
  languages: ConstantLanguageRow[];
  members: ProfileAllDataRow[];
};
