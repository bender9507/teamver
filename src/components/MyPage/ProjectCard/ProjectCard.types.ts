import type { ProjectsRow } from "~/states/server";

export interface ProjectCardProps {
  projectState: "proceed" | "previous";
  project: ProjectsRow;
}