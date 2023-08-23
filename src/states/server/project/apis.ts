import type { ProjectsRow } from ".";
import type { ProfileRow } from "..";
import { supabase } from "../config";

export const getProjects = async (memberId: string) => {
  const { data, error } = await supabase.from('projectMembers').select('projects(*)').eq('memberId', memberId).returns<{projects: ProjectsRow }[]>()

  if(error) throw error;

  return data;
}

export const getProjectMembers = async (projectId: string) => {
  const {data,error} = await supabase.from('projectMembers').select('members: profiles(*)').eq('projectId', projectId).returns<{members: ProfileRow}[]>()

  if(error) throw error;

  return data;
}