import type { ProfileAllDataRow } from "../profile";
import type { Table } from "../server.types";

export type ChatRoomTable = Table["chatRooms"];
export type ChatRoomRow = ChatRoomTable["Row"];

export type ChatMessageTable = Table["chatMessages"];
export type ChatMessageRow = ChatMessageTable["Row"];

export type ChatRequestMemberTable = Table["chatRequestMember"];
export type ChatRequestMemberRow = ChatRequestMemberTable["Row"];
export type ChatRequestMemberInsert = ChatRequestMemberTable["Insert"];

export type ChatRequestOwnerRow = Table["chatRequestOwner"]["Row"];
export type ChatRequestOwnerInsert = Table["chatRequestOwner"]["Insert"];

export interface ChatRoomAllData {
  id: number;
  members: ProfileAllDataRow[];
  messages: (Pick<ChatMessageRow, "id" | "message" | "createdAt"> & {
    sender: ProfileAllDataRow;
  })[];
}

export interface ChatRequestOwnerAllData extends Pick<ChatRequestOwnerRow, "id" | "state"> {
  requesterProfile: ProfileAllDataRow;
}

export interface ChatRequestMemberAllData extends Pick<ChatRequestMemberRow, "id" | "state"> {
  requesterProfile: ProfileAllDataRow;
}
