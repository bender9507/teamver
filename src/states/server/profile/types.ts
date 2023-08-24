import type { Table } from "../server.types";

export type ProfileTable = Table["profiles"];
export type ProfileInsert = ProfileTable["Insert"];

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

export type ProfileJobTable = Table["profileJobs"];
export type ProfileJobInsert = ProfileJobTable["Insert"];

export type ProfileAreaTable = Table["profileAreas"];
export type ProfileAreaInsert = ProfileAreaTable["Insert"];
