import type { Table } from "../server.types";
import type { constantMap } from "./apis";

export type ConstantMapKey = keyof typeof constantMap;

export type SelectedConstantMap<T extends ConstantMapKey[]> = {
  [K in T[number]]: Awaited<ReturnType<(typeof constantMap)[K]>>;
};

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
