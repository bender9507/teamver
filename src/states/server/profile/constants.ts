export const PROFILE_ALL_DATA_QUERY = `
    *,
    languages:profileLanguages!inner(...constantLanguages(*)),
    skills:profileSkills!inner(...constantSkills(*)),
    areas:profileAreas!inner(...constantAreas(*)),

    projectTypes:profileProjectTypes!inner(...constantProjectTypes(*)),
    personalities:profilePersonalities!inner(...constantPersonalities(*)),
    positions:profilePositions!inner(...constantPositions(*))
`;
