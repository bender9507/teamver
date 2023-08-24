import type { ProjectAllDataRow } from ".";
import { supabase } from "../config";
import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";

export const selectProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
        *,
        types:projectTypes!inner(...constantProjectTypes(*)),
        skills:projectSkills!inner(...constantSkills(*)),
        positions:projectPositions!inner(...constantPositions(*)),
        languages:projectLanguages!inner(...constantLanguages(*)),
        members:projectMembers!inner(...profiles(
          ${PROFILE_ALL_DATA_QUERY}
        ))
      `
    )
    .eq("id", projectId)
    .returns<ProjectAllDataRow[]>()
    .single();

  if (error) throw error;

  return data;
};
