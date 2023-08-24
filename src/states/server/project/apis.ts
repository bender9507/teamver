import type { ProjectAllDataRow } from ".";
import { supabase } from "../config";

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
          *, 
          skills:profileSkills!inner(...constantSkills(*)),
          projectTypes:profileProjectTypes!inner(...constantProjectTypes(*)),
          positions:profilePositions!inner(...constantPositions(*)),
          personalities:profilePersonalities!inner(...constantPersonalities(*)),
          languages:profileLanguages!inner(...constantLanguages(*)),
          jobs:profileJobs!inner(...constantJobs(*)),
          areas:profileAreas!inner(...constantAreas(*))
        ))
      `
    )
    .eq("id", projectId)
    .returns<ProjectAllDataRow[]>()
    .single();

  if (error) throw error;

  return data;
};
