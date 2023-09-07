import type { FollowProjectsAllDataRow } from "~/states/server/project";

export interface LikeMemberCardProps {
  data: FollowProjectsAllDataRow;
  userId: string;
}
