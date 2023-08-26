import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "../constant";
import type { Table } from "../server.types";

export type ProfileTable = Table["profiles"];
export type ProfileRow = ProfileTable["Row"];
export type ProfileInsert = ProfileTable["Insert"];
export type ProfileUpdate = ProfileTable["Update"];

export type ProfileSkillTable = Table["profileSkills"];
export type ProfileSkillInsert = ProfileSkillTable["Insert"];

export type ProfileProjectTypeTable = Table["profileProjectTypes"];
export type ProfileProjectTypeInsert = ProfileProjectTypeTable["Insert"];

export type ProfilePositionTable = Table["profilePositions"];
export type ProfilePositionInsert = ProfilePositionTable["Insert"];

export type ProfilePersonalityTable = Table["profilePersonalities"];
export type ProfilePersonalityInsert = ProfilePersonalityTable["Insert"];

export type ProfileLanguageTable = Table["profileLanguages"];
export type ProfileLanguageInsert = ProfileLanguageTable["Insert"];

export type ProfileAreaTable = Table["profileAreas"];
export type ProfileAreaInsert = ProfileAreaTable["Insert"];

export type ProfileAllDataRow = ProfileRow & {
  languages: ConstantLanguageRow[];
  skills: ConstantSkillRow[];
  areas: ConstantAreaRow[];
  jobs: ConstantJobRow[];
  projectTypes: ConstantProjectTypeRow[];
  personalities: ConstantPersonalityRow[];
  positions: ConstantPositionRow[];
};

export type ProfileAllDataInsert = ProfileInsert & {
  skills: ConstantSkillRow["id"][];
  projectTypes: ConstantProjectTypeRow["id"][];
  positions: ConstantPositionRow["id"][];
  personalities: ConstantPersonalityRow["id"][];
  languages: ConstantLanguageRow["id"][];
  areas: ConstantAreaRow["id"][];
};

export type ProfileAllDataUpdate = Omit<ProfileUpdate, "id"> & {
  id: string;
  skills: ConstantSkillRow["id"][];
  projectTypes: ConstantProjectTypeRow["id"][];
  positions: ConstantPositionRow["id"][];
  personalities: ConstantPersonalityRow["id"][];
  languages: ConstantLanguageRow["id"][];
  areas: ConstantAreaRow["id"][];
};
