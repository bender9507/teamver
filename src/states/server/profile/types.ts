import type { Table } from "../server.types";

export type ProfileTable = Table["profiles"];
export type ProfileRow = ProfileTable["Row"];
export type ProfileInsert = ProfileTable["Insert"];

export type ProfileAreaTable = Table["profileAreas"];
export type ProfileAreaRow = ProfileAreaTable["Row"];
export type ProfileAreaInsert = ProfileAreaTable["Insert"];

export type ProfileJobTable = Table["profileJobs"];
export type ProfileJobRow = ProfileJobTable["Row"];
export type ProfileJobInsert = ProfileJobTable["Insert"];

export type ProfileLanguageTable = Table["profileLanguages"];
export type ProfileLanguageRow = ProfileLanguageTable["Row"];
export type ProfileLanguageInsert = ProfileLanguageTable["Insert"];

export type ProfilePersonalityTable = Table["profilePersonalities"];
export type ProfilePersonalityRow = ProfilePersonalityTable["Row"];
export type ProfilePersonalityInsert = ProfilePersonalityTable["Insert"];

export type ProfilePositionTable = Table["profilePositions"];
export type ProfilePositionRow = ProfilePositionTable["Row"];
export type ProfilePositionInsert = ProfilePositionTable["Insert"];

export type ProfileSkillTable = Table["profileSkills"];
export type ProfileSkillRow = ProfileSkillTable["Row"];
export type ProfileSkillInsert = ProfileSkillTable["Insert"];

export type ProfileProjectTypeTable = Table["profileProjectTypes"];
export type ProfileProjectTypeRow = ProfileProjectTypeTable["Row"];
export type ProfileProjectTypeInsert = ProfileProjectTypeTable["Insert"];
