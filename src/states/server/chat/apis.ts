import { supabase } from "../config";
import type { ProfileAllDataRow } from "../profile";
import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";
import { CHAT_ROOM_ALL_DATA_QUERY } from "./constants";
import type {
  ChatMessageData,
  ChatRequestMemberAllData,
  ChatRequestMemberInsert,
  ChatRequestMemberRow,
  ChatRequestOwnerAllData,
  ChatRequestOwnerInsert,
  ChatRequestOwnerRow,
  ChatRoomAllData
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

export const selectChatRequestOwner = async ({
  receiverId,
  state
}: {
  receiverId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequestOwner")
    .select(`id, state, followId, requesterProfile:requesterId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("receiverId", receiverId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query.returns<ChatRequestOwnerAllData[]>();

  if (error) throw Error("채팅 요청 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const selectChatRequestMember = async ({
  receiverId,
  state
}: {
  receiverId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequestMember")
    .select(`id, state, followProjectId, requesterProfile:requesterId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("receiverId", receiverId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query.returns<ChatRequestMemberAllData[]>();

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
  const { data, error } = await supabase
    .from("chatMessages")
    .select("id, message, createdAt, sender:senderId(*), type")
    .eq("roomId", roomId)
    .returns<ChatMessageData[]>();

  if (error) throw Error("메세지 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const selectChatRoom = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  const { data, error } = await supabase
    .from("chatRooms")
    .select(
      `
        id,
        members:chatMembers(...userId(${PROFILE_ALL_DATA_QUERY}))
      `
    )
    .neq("members.userId", userId)
    .eq("id", roomId)
    .returns<Omit<ChatRoomAllData, "messages">[]>()
    .single();

  if (error) throw Error("채팅방을 불러오는데 실패하였습니다.");

  return data;
};

export const selectChatRooms = async (userId: string) => {
  const { data, error } = await supabase
    .from("chatMembers")
    .select(`...roomId(${CHAT_ROOM_ALL_DATA_QUERY})`)
    .limit(3, { foreignTable: "roomId.chatMessages" })
    .neq("roomId.members.userId", userId)
    .eq("userId", userId)
    .eq("state", true)
    .order("createdAt", { foreignTable: "roomId.messages", ascending: false })
    .returns<ChatRoomAllData[]>();

  if (error) throw Error("채팅방 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const deleteChatMember = async ({ roomId, userId }: { roomId: number; userId: string }) => {
  const { error } = await supabase
    .from("chatMembers")
    .delete()
    .eq("roomId", roomId)
    .eq("userId", userId);

  if (error) throw new Error("채팅방 유저를 삭제하는데 실패하였습니다.");
};

export const updateChatMemberState = async ({
  roomId,
  userId,
  state
}: {
  roomId: number;
  userId: string;
  state: boolean;
}) => {
  const { error } = await supabase
    .from("chatMembers")
    .update({ state })
    .eq("roomId", roomId)
    .eq("userId", userId);

  if (error) throw new Error("채팅방 유저 상태를 변경하는데 실패하였습니다.");
};

export const updateChatRequestOwnerState = async ({
  id,
  state
}: {
  id: number;
  state: "GRANT" | "DENIED";
}) => {
  const { error } = await supabase.from("chatRequestOwner").update({ state }).eq("id", id);

  if (error) throw new Error("요청 변경에 실패하였습니다.");
};

export const updateChatRequestMemberState = async ({
  id,
  state
}: {
  id: number;
  state: "GRANT" | "DENIED";
}) => {
  const { error } = await supabase.from("chatRequestMember").update({ state }).eq("id", id);

  if (error) throw new Error("요청 변경에 실패하였습니다.");
};

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

export const selectUnreadMessageCount = async ({
  userId,
  roomId
}: {
  userId: string;
  roomId: number;
}) => {
  const { data, error } = await supabase.rpc("unread_message_count", {
    userid: userId,
    roomid: roomId
  });

  if (error) throw new Error("읽지 않은 메세지를 가져오는데 실패했습니다.");

  return data;
};

export const updateLastReadMessage = async ({
  userId,
  roomId,
  lastReadMessageId
}: {
  userId: string;
  roomId: number;
  lastReadMessageId: number;
}) => {
  const { error } = await supabase.from("chatReadStatus").upsert(
    {
      userId,
      roomId,
      lastReadMessageId
    },
    { onConflict: "userId, roomId" }
  );

  if (error) throw new Error("마지막으로 읽은 메세지를 업데이트하는데 실패했습니다.");
};

export const updateMessageReadState = async ({
  roomId,
  userId
}: {
  roomId: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from("chatMessages")
    .update({ state: true })
    .eq("state", false)
    .eq("roomId", roomId)
    .neq("senderId", userId);

  if (error) throw Error("메세지를 읽음 처리하는데 실패하였습니다.");
};

export const selectOpponent = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  const { data, error } = await supabase
    .from("chatMembers")
    .select(`...userId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("roomId", roomId)
    .neq("userId", userId)
    .returns<ProfileAllDataRow[]>()
    .maybeSingle();

  if (error) throw Error("상대방을 불러오는데 실패하였습니다.");

  return data;
};
