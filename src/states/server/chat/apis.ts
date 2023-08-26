import { supabase } from "../config";
import type { ProfileAllDataRow } from "../profile";
import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";
import type { ChatMessageRow, ChatRequestRow } from "./types";

export const insertChatRequest = async (chatRequest: {
  requesterId: string;
  receiverId: string;
}) => {
  const { error } = await supabase.from("chatRequest").insert(chatRequest);

  if (error) throw Error("채팅 요청에 실패하였습니다.");
};

export const selectChatRequests = async ({
  requesterId,
  state
}: {
  requesterId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequest")
    .select(`id, state, receiverProfile:receiverId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("requesterId", requesterId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query.returns<
    (Pick<ChatRequestRow, "id" | "state"> & { receiverProfile: ProfileAllDataRow })[]
  >();

  if (error) throw Error("채팅 요청 목록을 불러오는데 실패하였습니다.");

  return data;
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

  if (error) throw error;

  return data;
};
