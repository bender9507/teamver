import { supabase } from "../config";
import type {
  NoticeMemberInsert,
  NoticeMemberRow,
  NoticeOwnerInsert,
  NoticeOwnerRow
} from "./types";

export const selectNoticeMember = async (myId: string) => {
  const { data, error } = await supabase
    .from("noticeMember")
    .select("*")
    .eq("receiverId", myId)
    .returns<NoticeMemberRow[]>();

  if (error) throw error;

  return data;
};

export const selectNoticeOwner = async (myId: string) => {
  const { data, error } = await supabase
    .from("noticeOwner")
    .select("*")
    .eq("receiverId", myId)
    .returns<NoticeOwnerRow[]>();

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
