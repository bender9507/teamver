import type { ProjectAllDataRow } from "~/states/server/project";

export interface ProjectCardBoxProps {
  projects: ProjectAllDataRow[];
  titleKey: string;
}
