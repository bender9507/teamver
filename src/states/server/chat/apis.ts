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
  receiverId,
  state
}: {
  receiverId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequest")
    .select(`id, state, requesterProfile:requesterId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("receiverId", receiverId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query.returns<
    (Pick<ChatRequestRow, "id" | "state"> & { requesterProfile: ProfileAllDataRow })[]
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

// export const insertChatRoomWithMember = async ({
//   requesterId,
//   receiverId
// }: {
//   requesterId: string;
//   receiverId: string;
// }) => {
//   const { data, error }: InsertChatRoomResponse = await supabase
//     .from("chatRoom")
//     .insert([{ createdAt: new Date() }]);

//   if (error) throw new Error("채팅방을 생성하는데 실패했습니다.");

//   if (data && "id" in data[0]) {
//     const roomId = (data as ChatRoomRow[])[0].id;

//     const { error: memberError } = await supabase.from("chatMembers").insert([
//       { roomId, userId: receiverId },
//       { roomId, userId: requesterId }
//     ]);

//     if (memberError) throw new Error("채팅멤버을 생성하는데 실패했습니다.");
//   }
// };

export const insertChatRoomWithMember = async ({
  requesterId,
  receiverId
}: {
  requesterId: string;
  receiverId: string;
}) => {
  const { error } = await supabase.rpc("insert_chatroom_with_member", {
    requester_id: requesterId,
    receiver_id: receiverId
  });

  if (error) throw new Error("채팅방 및 멤버 생성에 실패했습니다.");
};

// export const insertChatRoomWithMember = async ({
//   requesterId,
//   receiverId
// }: {
//   requesterId: string;
//   receiverId: string;
// }) => {
//   // chatRooms 테이블에 새로운 row를 추가
//   const { data: roomData, error: roomError } = await supabase
//     .from("chatRooms")
//     .insert([{ createdAt: new Date().toISOString() }]);

//   if (roomError || !roomData) {
//     console.error("error :", roomError);
//     throw new Error("채팅방 생성에 실패했습니다.");
//   }

//   const newRoomId = roomData[0].id;

//   // chatMembers 테이블에 새로운 row를 추가
//   const { error: memberError } = await supabase.from("chatMembers").insert([
//     { roomId: newRoomId, userId: requesterId, createdAt: new Date().toISOString() },
//     { roomId: newRoomId, userId: receiverId, createdAt: new Date().toISOString() }
//   ]);

//   if (memberError) {
//     console.error("error :", memberError);
//     throw new Error("멤버 생성에 실패했습니다.");
//   }
// };
