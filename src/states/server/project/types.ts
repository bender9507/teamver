import type { Database } from "~/types/database";
import type {
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "../constant";
import type { ProfileAllDataRow } from "../profile";
import type { Table } from "../server.types";

export type ProjectDataRow = Table["projects"]["Row"];
export type ProjectDataInsert = Table["projects"]["Insert"];
export type ProjectDataUpdate = Table["projects"]["Update"];

export type ProjectInviteInsert = Table["projectInvite"]["Insert"];

export type FollowProjectRow = Table["followProject"]["Row"];
export type FollowProjectInsert = Table["followProject"]["Insert"];

export type ProjectMembersRow = Table["projectMembers"]["Row"];

export type ProjectAllDataRow = ProjectDataRow & {
  projectTypes: ConstantProjectTypeRow[];
  skills: ConstantSkillRow[];
  positions: ConstantPositionRow[];
  languages: ConstantLanguageRow[];
  members: ProfileAllDataRow[];
};

export type InviteState = Database["public"]["Enums"]["invite_state"];
