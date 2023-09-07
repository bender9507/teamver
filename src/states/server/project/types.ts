import type { Database } from "~/types/database";
import type { ChatRequestMemberRow } from "../chat";
import type {
  ConstantAreaRow,
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

export type ProjectInviteRow = Table["projectInvite"]["Row"];
export type ProjectInviteAllRow = ProjectInviteRow & {
  project: ProjectAllDataRow;
};
export type ProjectInviteInsert = Table["projectInvite"]["Insert"];

export type FollowProjectRow = Table["followProject"]["Row"];
export type FollowProjectInsert = Table["followProject"]["Insert"];

export type ProjectMembersRow = Table["projectMembers"]["Row"];
export type ProjectMembersInsert = Table["projectMembers"]["Insert"];
export type ProjectMembersUpdate = Table["projectMembers"]["Update"];

export type FollowProjectsAllDataRow = {
  id: number;
  project: ProjectAllDataRow;
  chatRequest: ChatRequestMemberRow[];
};

export type ProjectAllDataRow = Omit<ProjectDataRow, "projectType"> & {
  projectType: ConstantProjectTypeRow;
  ownerProfile: ProfileAllDataRow;
  areas: ConstantAreaRow[];
  skills: ConstantSkillRow[];
  positions: ConstantPositionRow[];
  languages: ConstantLanguageRow[];
  members: ProfileAllDataRow[];
};

export type InviteState = Database["public"]["Enums"]["invite_state"];
