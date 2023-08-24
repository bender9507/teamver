import type { ProfileAllDataRow } from "../profile";
import type { Table } from "../server.types";

type ProjectDataRow = Table["projects"]["Row"];
type ProjectLanguagesDataRow = Table["constantLanguages"]["Row"];
type ProjectTypeRow = Table["constantProjectTypes"]["Row"];
type ProjectSkillRow = Table["constantSkills"]["Row"];
type ProjectPositionRow = Table["constantPositions"]["Row"];

export type ProjectAllDataRow = ProjectDataRow & {
  projectTypes: ProjectTypeRow[];
  skills: ProjectSkillRow[];
  positions: ProjectPositionRow[];
  languages: ProjectLanguagesDataRow[];
  members: ProfileAllDataRow[];
};
