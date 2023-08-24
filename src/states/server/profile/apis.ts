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
import type { ProfileInsert, ProfileRow, ProfileUpdate } from "./types";

export const insertProfile = async ({
  skills,
  projectTypes,
  positions,
  personalities,
  languages,
  jobs,
  areas,
  ...profile
}: ProfileInsert & {
  skills: ConstantSkillRow["id"][];
  projectTypes: ConstantProjectTypeRow["id"][];
  positions: ConstantPositionRow["id"][];
  personalities: ConstantPersonalityRow["id"][];
  languages: ConstantLanguageRow["id"][];
  jobs: ConstantJobRow["id"][];
  areas: ConstantAreaRow["id"][];
}) => {
  const { error } = await supabase.from("profiles").insert(profile);

  if (error) throw error;

  const mappings = {
    profileLanguages: languages.map((languageId) => ({ languageId, userId: profile.id })),
    profileSkills: skills.map((skillId) => ({ skillId, userId: profile.id })),
    profileAreas: areas.map((areaId) => ({ areaId, userId: profile.id })),
    profileJobs: jobs.map((jobId) => ({ jobId, userId: profile.id })),
    profileProjectTypes: projectTypes.map((projectTypeId) => ({
      projectTypeId,
      userId: profile.id
    })),
    profilePersonalities: personalities.map((personalityId) => ({
      personalityId,
      userId: profile.id
    })),
    profilePositions: positions.map((positionId) => ({ positionId, userId: profile.id }))
  };

  const tasks = Object.entries(mappings).map(async ([table, data]) => {
    const { error } = await supabase.from(table).insert(data);

    if (error) throw Error("프로필 생성 실패");
  });

  await Promise.all(tasks);
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

export const updateProfile = async ({
  skills,
  projectTypes,
  positions,
  personalities,
  languages,
  jobs,
  areas,
  ...profile
}: Omit<ProfileUpdate, "id"> & {
  id: string;
  skills: ConstantSkillRow["id"][];
  projectTypes: ConstantProjectTypeRow["id"][];
  positions: ConstantPositionRow["id"][];
  personalities: ConstantPersonalityRow["id"][];
  languages: ConstantLanguageRow["id"][];
  jobs: ConstantJobRow["id"][];
  areas: ConstantAreaRow["id"][];
}) => {
  const { error } = await supabase.from("profiles").update(profile).eq("id", profile.id);

  if (error) throw error;

  const mappings = {
    profileLanguages: languages.map((languageId) => ({ languageId, userId: profile.id })),
    profileSkills: skills.map((skillId) => ({ skillId, userId: profile.id })),
    profileAreas: areas.map((areaId) => ({ areaId, userId: profile.id })),
    profileJobs: jobs.map((jobId) => ({ jobId, userId: profile.id })),
    profileProjectTypes: projectTypes.map((projectTypeId) => ({
      projectTypeId,
      userId: profile.id
    })),
    profilePersonalities: personalities.map((personalityId) => ({
      personalityId,
      userId: profile.id
    })),
    profilePositions: positions.map((positionId) => ({ positionId, userId: profile.id }))
  };

  const tasks = Object.entries(mappings).map(async ([table, data]) => {
    const { error: clearError } = await supabase.from(table).delete().eq("userId", profile.id);
    const { error: insertError } = await supabase.from(table).insert(data);

    if (clearError || insertError) throw Error("프로필 업데이트 실패");
  });

  await Promise.all(tasks);
};
