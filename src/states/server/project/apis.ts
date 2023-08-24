import type { ProjectAllDataRow, ProjectDataInsert } from ".";
import { supabase } from "../config";
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
    .eq("memberId", myId);

  if (error) throw error;

  return data;
};

export const insertProject = async (projectData: ProjectDataInsert) => {
  const { error } = await supabase.from("projects").insert(projectData);

  if (error) throw error;
};
