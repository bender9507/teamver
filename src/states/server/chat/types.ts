import type { PostgrestError } from "@supabase/supabase-js";
import type { Table } from "../server.types";

export type ChatRoomTable = Table["chatRooms"];
export type ChatRoomRow = ChatRoomTable["Row"];

export type ChatMessageTable = Table["chatMessages"];
export type ChatMessageRow = ChatMessageTable["Row"];

export type ChatRequestTable = Table["chatRequest"];
export type ChatRequestRow = ChatRequestTable["Row"];

export interface InsertChatRoomResponse {
  data: ChatRoomRow[] | null;
  error: PostgrestError | null;
}
