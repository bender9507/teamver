import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";

export const PROJECT_ALL_DATA_QUERY = `
  *,
<<<<<<< HEAD
  
=======
  projectType:constantProjectTypes(*),
  ownerProfile:profiles!inner(*),
>>>>>>> 6fc8128c2d6f366d34ba301c15f55efec746ef2e
  skills:projectSkills!inner(...constantSkills(*)),
  positions:projectPositions!inner(...constantPositions(*)),
  languages:projectLanguages!inner(...constantLanguages(*)),
  members:projectMembers!inner(...profiles(
    ${PROFILE_ALL_DATA_QUERY}
  ))
 `;
