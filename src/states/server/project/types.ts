import type { Table } from "../server.types";

type ProjectDataRow = Table["projects"]["Row"];
type ProjectLanguagesDataRow = Table["constantLanguages"]["Row"];
type ProjectTypeRow = Table["constantProjectTypes"]["Row"];
type ProjectSkillRow = Table["constantSkills"]["Row"];
type ProjectPositionRow = Table["constantPositions"]["Row"];

type ProfileDataRow = Table["profiles"]["Row"];
type ProfileLanguagesDataRow = Table["constantLanguages"]["Row"];
type ProfileTypeRow = Table["constantProjectTypes"]["Row"];
type ProfileSkillRow = Table["constantSkills"]["Row"];
type ProfilePositionRow = Table["constantPositions"]["Row"];
type profilePersonalityRow = Table["constantPersonalities"]["Row"];
type profileJobRow = Table["constantJobs"]["Row"];
type profileAreaRow = Table["constantAreas"]["Row"];

type ProfileAllDataRow = ProfileDataRow & {
  languages: ProfileLanguagesDataRow[];
  projectTypes: ProfileTypeRow[];
  skills: ProfileSkillRow[];
  positions: ProfilePositionRow[];
  personalities: profilePersonalityRow[];
  jobs: profileJobRow[];
  areas: profileAreaRow[];
};

export type ProjectAllDataRow = ProjectDataRow & {
  projectTypes: ProjectTypeRow[];
  skills: ProjectSkillRow[];
  positions: ProjectPositionRow[];
  languages: ProjectLanguagesDataRow[];
  members: ProfileAllDataRow[];
};
