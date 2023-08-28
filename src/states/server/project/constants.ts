import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";

export const PROJECT_ALL_DATA_QUERY = `
  *,
  projectType:constantProjectTypes(*),
  ownerProfile:profiles!inner(*),
  skills:projectSkills!inner(...constantSkills(*)),
  positions:projectPositions!inner(...constantPositions(*)),
  languages:projectLanguages!inner(...constantLanguages(*)),
  members:projectMembers!inner(...profiles(
    ${PROFILE_ALL_DATA_QUERY}
    ))
    `;
