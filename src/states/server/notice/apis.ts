import { supabase } from "../config";
import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";
import type {
  NoticeMemberAllDataRow,
  NoticeMemberInsert,
  NoticeOwnerAllDataRow,
  NoticeOwnerInsert
} from "./types";

export const selectNoticeMember = async (myId: string) => {
  const { data, error } = await supabase
    .from("noticeMember")
    .select(`*, requesterProfile: profiles!requesterId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("receiverId", myId)
    .order("createdAt", { ascending: false })
    .returns<NoticeMemberAllDataRow[]>();

  if (error) throw error;

  return data;
};

export const selectNoticeOwner = async (myId: string) => {
  const { data, error } = await supabase
    .from("noticeOwner")
    .select(`*, requesterProfile:profiles!requesterId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("receiverId", myId)
    .order("createdAt", { ascending: false })
    .returns<NoticeOwnerAllDataRow[]>();

  if (error) throw error;

  return data;
};

export const selectNoticeCountMember = async (myId: string) => {
  const { count, error } = await supabase
    .from("noticeMember")
    .select("*", { count: "exact", head: true })
    .eq("isRead", false)
    .eq("receiverId", myId)
    .returns<number>();

  if (error) throw error;

  return count;
};

export const selectNoticeCountOwner = async (myId: string) => {
  const { count, error } = await supabase
    .from("noticeOwner")
    .select("*", { count: "exact", head: true })
    .eq("isRead", false)
    .eq("receiverId", myId)
    .returns<number>();

  if (error) throw error;

  return count;
};

export const insertNoticeMember = async ({
  receiverId,
  requesterId,
  state
}: NoticeMemberInsert) => {
  const { error } = await supabase.from("noticeMember").insert({ receiverId, requesterId, state });

  if (error) throw error;
};

export const insertNoticeOwner = async ({ receiverId, requesterId, state }: NoticeOwnerInsert) => {
  const { error } = await supabase.from("noticeOwner").insert({ receiverId, requesterId, state });

  if (error) throw error;
};

export const updateNoticeMember = async (id: number) => {
  const { error } = await supabase.from("noticeMember").update({ isRead: true }).eq("id", id);

  if (error) throw error;
};

export const updateNoticeOwner = async (id: number) => {
  const { error } = await supabase.from("noticeOwner").update({ isRead: true }).eq("id", id);

  if (error) throw error;
};

export const deleteNoticeMember = async (id: number) => {
  const { error } = await supabase.from("noticeMember").delete().eq("id", id);

  if (error) throw error;
};

export const deleteNoticeOwner = async (id: number) => {
  const { error } = await supabase.from("noticeOwner").delete().eq("id", id);

  if (error) throw error;
};
