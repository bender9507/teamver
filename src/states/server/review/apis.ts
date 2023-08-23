import { supabase } from "../config";
import type { ProfileRow, ReactionItem, ReviewRow } from "./types";

export const getReviews = async (userId: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `*, 
      constantReactions(ko), 
      reviewer:profiles!reviewerId(*)
      `
    )
    .eq("receiverId", userId)
    .returns<(ReviewRow & { constantReactions: ReactionItem } & { reviewer: ProfileRow })[]>();

  if (error) throw error;

  return data;
};
