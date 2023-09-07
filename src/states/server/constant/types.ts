import type { Table } from "../server.types";

export type ConstantLanguageTable = Table["constantLanguages"];
export type ConstantLanguageRow = ConstantLanguageTable["Row"];

export type ConstantAreaTable = Table["constantAreas"];
export type ConstantAreaRow = ConstantAreaTable["Row"];

export type ConstantJobTable = Table["constantJobs"];
export type ConstantJobRow = ConstantJobTable["Row"];

export type ConstantPersonalityTable = Table["constantPersonalities"];
export type ConstantPersonalityRow = ConstantPersonalityTable["Row"];

export type ConstantPositionTable = Table["constantPositions"];
export type ConstantPositionRow = ConstantPositionTable["Row"];

export type ConstantProjectTypeTable = Table["constantProjectTypes"];
export type ConstantProjectTypeRow = ConstantProjectTypeTable["Row"];

export type ConstantReactionTable = Table["constantReactions"];
export type ConstantReactionRow = ConstantReactionTable["Row"];

export type ConstantSkillTable = Table["constantSkills"];
export type ConstantSkillRow = ConstantSkillTable["Row"];

export type ConstantRoleTable = Table["constantRoles"];
export type ConstantRoleRow = ConstantRoleTable["Row"];

export type ConstantEmojiTable = Table["constantEmojis"];
export type ConstantEmojiRow = ConstantEmojiTable["Row"];

export interface ConstantAllData {
  areas: ConstantAreaRow[];
  jobs: ConstantJobRow[];
  languages: ConstantLanguageRow[];
  personalities: ConstantPersonalityRow[];
  positions: ConstantPositionRow[];
  projectTypes: ConstantProjectTypeRow[];
  reactions: ConstantReactionRow[];
  roles: ConstantRoleRow[];
  skills: ConstantSkillRow[];
  emojis: ConstantEmojiRow[];
}
