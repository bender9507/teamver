import type { ChatRequestOwnerRow } from "~/states/server/chat/types";
import type { ProfileAllDataRow } from "~/states/server/profile";

export interface LikeOwnerCardProps {
  data: {
    id: number;
    follow: ProfileAllDataRow;
    chatRequest: ChatRequestOwnerRow[];
  };
  userId: string;
}
