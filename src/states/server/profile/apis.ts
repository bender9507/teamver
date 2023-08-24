import { supabase } from "../config";
import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "../constant";
import type {
  ProfileAreaInsert,
  ProfileInsert,
  ProfileJobInsert,
  ProfileLanguageInsert,
  ProfilePersonalityInsert,
  ProfilePositionInsert,
  ProfileProjectTypeInsert,
  ProfileRow,
  ProfileSkillInsert
} from "./types";

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

export const insertProfilePositions = async (positions: ProfilePositionInsert[]) => {
  const { error } = await supabase.from("profilePositions").insert(positions);

  if (error) throw error;
};

export const insertProfile = async (
  profile: ProfileInsert & {
    skills: ConstantSkillRow["id"][];
    projectTypes: ConstantProjectTypeRow["id"][];
    positions: ConstantPositionRow["id"][];
    personalities: ConstantPersonalityRow["id"][];
    languages: ConstantLanguageRow["id"][];
    jobs: ConstantJobRow["id"][];
    areas: ConstantAreaRow["id"][];
  }
) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw Error("비로그인 유저입니다.");

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    name: profile.name,
    introduce: profile.introduce,
    imageUrl: profile.imageUrl,
    github: user.user_metadata.preferred_username
  });

  if (error) throw error;

  const languages = insertProfileLanguages(
    profile.languages.map((languageId) => ({ languageId, userId: user.id }))
  );

  const skills = insertProfileSkills(
    profile.skills.map((skillId) => ({ skillId, userId: user.id }))
  );

  const areas = insertProfileAreas(profile.areas.map((areaId) => ({ areaId, userId: user.id })));

  const jobs = insertProfileJobs(profile.jobs.map((jobId) => ({ jobId, userId: user.id })));

  const projectTypes = insertProfileProjectType(
    profile.projectTypes.map((projectTypeId) => ({ projectTypeId, userId: user.id }))
  );

  const personalities = insertProfilePersonalities(
    profile.personalities.map((personalityId) => ({
      personalityId,
      userId: user.id
    }))
  );

  const positions = insertProfilePositions(
    profile.positions.map((positionId) => ({ positionId, userId: user.id }))
  );

  await Promise.all([languages, skills, areas, jobs, projectTypes, personalities, positions]);
};

export const selectProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      languages:profileLanguages!inner(...constantLanguages(*)),
      skills:profileSkills!inner(...constantSkills(*)),
      areas:profileAreas!inner(...constantAreas(*)),
      jobs:profileJobs!inner(...constantJobs(*)),
      projectTypes:profileProjectTypes!inner(...constantProjectTypes(*)),
      personalities:profilePersonalities!inner(...constantPersonalities(*)),
      positions:profilePositions!inner(...constantPositions(*))
    `
    )
    .eq("id", userId)
    .returns<
      (ProfileRow & {
        languages: ConstantLanguageRow[];
        skills: ConstantSkillRow[];
        areas: ConstantAreaRow[];
        jobs: ConstantJobRow[];
        projectTypes: ConstantProjectTypeRow[];
        personalities: ConstantPersonalityRow[];
        positions: ConstantPositionRow[];
      })[]
    >();

  if (error) throw error;

  return data[0];
};
