import { supabase } from "../config";

export const getProjects = async (memberId: string) => {
  const { data, error } = await supabase.from('projectMembers').select('projects(*)').eq('memberId', memberId)

  if(error) throw error;

  return data;
}