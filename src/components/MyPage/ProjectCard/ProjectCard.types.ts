import type { ProjectAllDataRow } from "~/states/server/project";

export interface ProjectCardProps {
  projectState: "proceed" | "previous";
  project: ProjectAllDataRow;
}
