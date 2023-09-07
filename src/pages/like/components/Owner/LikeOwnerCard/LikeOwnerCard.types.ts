import type { FollowsAllDataRow } from "~/states/server/profile";

export interface LikeOwnerCardProps {
  data: FollowsAllDataRow;
  userId: string;
}
