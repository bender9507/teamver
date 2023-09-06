import type { ProjectAllDataRow } from "~/states/server/project";

export interface ProjectStatusUpdateProps {
  project: ProjectAllDataRow;
  isMine?: boolean;
}
