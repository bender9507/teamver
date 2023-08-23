import type {
  ProfileAreaInsert,
  ProfileInsert,
  ProfileJobInsert,
  ProfileLanguageInsert,
  ProfilePersonalityInsert,
  ProfileProjectTypeInsert,
  ProfileSkillInsert
} from ".";
import { supabase } from "../config";

export const insertProfile = async (profile: ProfileInsert) => {
  const { error } = await supabase.from("profiles").insert(profile);

  if (error) throw error;
};

export const insertProfileLanguages = async (languages: ProfileLanguageInsert[]) => {
  const { error } = await supabase.from("profileLanguages").insert(languages);

  if (error) throw error;
};

export const insertProfileSkills = async (skills: ProfileSkillInsert[]) => {
  const { error } = await supabase.from("profileSkills").insert(skills);

  if (error) throw error;
};

export const insertProfileProjectType = async (projectTypes: ProfileProjectTypeInsert[]) => {
  const { error } = await supabase.from("profileProjectTypes").insert(projectTypes);

  if (error) throw error;
};

export const insertProfilePersonalities = async (personalities: ProfilePersonalityInsert[]) => {
  const { error } = await supabase.from("profilePersonalities").insert(personalities);

  if (error) throw error;
};

export const insertProfileAreas = async (areas: ProfileAreaInsert[]) => {
  const { error } = await supabase.from("profileAreas").insert(areas);

  if (error) throw error;
};

export const insertProfileJobs = async (jobs: ProfileJobInsert[]) => {
  const { error } = await supabase.from("profileJobs").insert(jobs);

  if (error) throw error;
};

export const createProfile = async (profiles: {
  profile: ProfileInsert;
  languages: ProfileLanguageInsert[];
  skills: ProfileSkillInsert[];
  areas: ProfileAreaInsert[];
  jobs: ProfileJobInsert[];
  projectTypes: ProfileProjectTypeInsert[];
  personalities: ProfilePersonalityInsert[];
}) => {
  await insertProfile(profiles.profile);

  const languagesPromise = insertProfileLanguages(profiles.languages);
  const skillsPromise = insertProfileSkills(profiles.skills);
  const areasPromise = insertProfileAreas(profiles.areas);
  const jobsPromise = insertProfileJobs(profiles.jobs);
  const projectTypesPromise = insertProfileProjectType(profiles.projectTypes);
  const personalitiesPromise = insertProfilePersonalities(profiles.personalities);

  await Promise.all([
    languagesPromise,
    skillsPromise,
    areasPromise,
    jobsPromise,
    projectTypesPromise,
    personalitiesPromise
  ]);
};
