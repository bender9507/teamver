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

  const { data, error } = await query.returns<
    (Pick<ChatRequestOwnerRow, "id" | "state"> & { requesterProfile: ProfileAllDataRow })[]
  >();

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

  const { data, error } = await query.returns<
    (Pick<ChatRequestMemberRow, "id" | "state"> & { requesterProfile: ProfileAllDataRow })[]
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

  if (error) throw new Error("채팅방 유저를 삭제하는데 실패하였습니다.");
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
