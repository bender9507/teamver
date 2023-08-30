import type { Table } from "../server.types";

export type ChatRoomTable = Table["chatRooms"];
export type ChatRoomRow = ChatRoomTable["Row"];

export type ChatMessageTable = Table["chatMessages"];
export type ChatMessageRow = ChatMessageTable["Row"];

export type ChatRequestMemberTable = Table["chatRequestMember"];
export type ChatRequestMemberRow = ChatRequestMemberTable["Row"];

export type ChatRequestOwnerRow = Table["chatRequestOwner"]["Row"];
