import type { ProjectAllDataRow, ProjectDataInsert, ProjectDataRow } from ".";
import { supabase } from "../config";
import type {
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "../constant";
import { PROJECT_ALL_DATA_QUERY } from "./constants";

export const selectProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select(`${PROJECT_ALL_DATA_QUERY}`)
    .eq("id", projectId)
    .returns<ProjectAllDataRow[]>()
    .single();

  if (error) throw error;

  return data;
};

export const selectOwnerProjects = async (myId?: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select(`${PROJECT_ALL_DATA_QUERY}`)
    .eq("ownerId", myId)
    .returns<ProjectAllDataRow[]>();

  if (error) throw error;

  return data;
};

export const selectMemberProjects = async (myId?: string) => {
  const { data, error } = await supabase
    .from("projectMembers")
    .select(`...projects!inner(${PROJECT_ALL_DATA_QUERY})`)
    .eq("memberId", myId)
    .returns<ProjectAllDataRow[]>();

  if (error) throw error;

  return data;
};

export const selectFollowProjects = async (myId?: string) => {
  const { data, error } = await supabase
    .from("followProject")
    .select(`id, project:projects!inner(${PROJECT_ALL_DATA_QUERY})`)
    .eq("followerId", myId);

  if (error) throw error;

  return data;
};

export const insertProject = async ({
  skills,
  projectTypes,
  languages,
  positions,
  ...projectData
}: ProjectDataInsert & {
  skills: ConstantSkillRow["id"][];
  projectTypes: ConstantProjectTypeRow["id"][];
  languages: ConstantLanguageRow["id"][];
  positions: ConstantPositionRow["id"][];
}) => {
  const { data, error } = await supabase
    .from("projects")
    .insert(projectData)
    .select("*")
    .returns<ProjectDataRow>();

  if (error) throw error;

  const mapping = {
    projectLanguages: languages.map((id) => ({ languageId: id, projectId: data.id })),
    projectMembers: [{ memberId: projectData.ownerId, projectId: data.id }],
    projectPositions: positions.map((id) => ({ positionId: id, projectId: data.id })),
    projectSkills: skills.map((id) => ({ skillId: id, projectId: data.id })),
    projectTypes: projectTypes.map((id) => ({ projectTypeId: id, projectId: data.id }))
  };
  const tasks = Object.entries(mapping).map(async ([table, data]) => {
    const { error } = await supabase.from(table).insert(data);

    if (error) throw Error("프로젝트 생성 실패");
  });
  await Promise.all(tasks);
};
