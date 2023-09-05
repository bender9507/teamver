import type { ProjectAllDataRow } from "~/states/server/project";

export type ProjectStatusUpdateProps = {
  project: ProjectAllDataRow;
  isMine?: boolean;
};
