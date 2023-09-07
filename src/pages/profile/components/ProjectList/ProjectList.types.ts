import type { ProjectAllDataRow } from "~/states/server/project";

export interface ProjectListProps {
  doneProjects: ProjectAllDataRow[];
  inProjects: ProjectAllDataRow[];
  selectedTab: string;
  isMine?: boolean;
}
