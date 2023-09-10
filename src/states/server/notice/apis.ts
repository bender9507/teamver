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
