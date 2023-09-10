import type { Database } from "~/types/database";
import type { ProfileAllDataRow } from "../profile";
import type { Table } from "../server.types";

export type NoticeMemberRow = Table["noticeMember"]["Row"];
export type NoticeMemberInsert = Table["noticeMember"]["Insert"];

export type NoticeOwnerRow = Table["noticeOwner"]["Row"];
export type NoticeOwnerInsert = Table["noticeOwner"]["Insert"];

export type NoticeMemberAllDataRow = NoticeMemberRow & {
  requesterProfile: ProfileAllDataRow;
};

export type NoticeOwnerAllDataRow = NoticeOwnerRow & {
  requesterProfile: ProfileAllDataRow;
};

export type NoticeState = Database["public"]["Enums"]["notification_state"];
