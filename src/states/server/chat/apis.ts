import { supabase } from "../config";
import type { ProfileAllDataRow } from "../profile";
import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";
import type {
  ChatMessageRow,
  ChatRequestMemberInsert,
  ChatRequestMemberRow,
  ChatRequestOwnerInsert,
  ChatRequestOwnerRow
} from "./types";

export const insertChatRequestOwner = async (chatRequest: ChatRequestOwnerInsert) => {
  const { error } = await supabase.from("chatRequestOwner").insert(chatRequest);

  if (error) throw Error("채팅 요청에 실패하였습니다.");
};

export const insertChatRequestMember = async (chatRequest: ChatRequestMemberInsert) => {
  const { error } = await supabase.from("chatRequestMember").insert(chatRequest);

  if (error) throw Error("채팅 요청에 실패하였습니다.");
};

export const selectChatRequestsMember = async ({
  requesterId,
  state
}: {
  requesterId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequestMember")
    .select(`*, receiverProfile:receiverId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("requesterId", requesterId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query.returns<
    (Pick<ChatRequestMemberRow, "id" | "state"> & { receiverProfile: ProfileAllDataRow })[]
  >();

  if (error) throw Error("채팅 요청 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const selectChatRequestsOwner = async ({
  requesterId,
  state
}: {
  requesterId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequestOwner")
    .select(`*, receiverProfile:receiverId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("requesterId", requesterId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query.returns<
    (Pick<ChatRequestOwnerRow, "id" | "state"> & { receiverProfile: ProfileAllDataRow })[]
  >();

  if (error) throw Error("채팅 요청 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const deleteChatRequestMember = async (id: number) => {
  const { error } = await supabase.from("chatRequestMember").delete().eq("id", id);

  if (error) throw error;
};

export const deleteChatRequestOwner = async (id: number) => {
  const { error } = await supabase.from("chatRequestOwner").delete().eq("id", id);

  if (error) throw error;
};

export const insertChatMessage = async (message: {
  roomId: number;
  senderId: string;
  message: string;
}) => {
  const { error } = await supabase.from("chatMessages").insert(message);

  if (error) throw Error("메세지 전송에 실패하였습니다.");
};

export const selectChatMessages = async (roomId: number) => {
  const { data, error } = await supabase.from("chatMessages").select("*").eq("roomId", roomId);

  if (error) throw Error("메세지 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const selectChatRooms = async (userId: string) => {
  const { data, error } = await supabase
    .from("chatMembers")
    .select(
      `
        ...roomId(
        id, 
        members:chatMembers(...userId(${PROFILE_ALL_DATA_QUERY})),
        messages:chatMessages(id, message, createdAt, sender:senderId(${PROFILE_ALL_DATA_QUERY})))
      `
    )
    .limit(3, { foreignTable: "roomId.chatMessages" })
    .neq("roomId.members.userId", userId)
    .eq("userId", userId)
    .order("createdAt", { foreignTable: "roomId.messages", ascending: false })
    .returns<
      {
        id: number;
        members: ProfileAllDataRow[];
        messages: (Pick<ChatMessageRow, "id" | "message" | "createdAt"> & {
          sender: ProfileAllDataRow;
        })[];
      }[]
    >();

  if (error) throw Error("채팅방 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const deleteChatMember = async ({ roomId, userId }: { roomId: number; userId: string }) => {
  const { error } = await supabase
    .from("chatMembers")
    .delete()
    .eq("roomId", roomId)
    .eq("userId", userId);

  if (error) throw new Error("채팅방을 삭제하는데 실패하였습니다.");
};

export const updateChatRequestState = async ({
  id,
  state
}: {
  id: number;
  state: "GRANT" | "DENIED";
}) => {
  const { error } = await supabase.from("chatRequest").update({ state }).eq("id", id);

  if (error) throw new Error("요청 변경에 실패하였습니다.");
};
