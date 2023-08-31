import type { ChatRequestMemberRow } from "~/states/server/chat/types";
import type { ProjectAllDataRow } from "~/states/server/project";

export interface LikeCardMemberProps {
  data: {
    id: number;
    project: ProjectAllDataRow;
    chatRequest: ChatRequestMemberRow[];
  };
  userId: string;
}
