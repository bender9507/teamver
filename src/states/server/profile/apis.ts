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
import { PROFILE_ALL_DATA_QUERY } from "./constants";
import type { ProfileAllDataRow, ProfileInsert, ProfileUpdate } from "./types";

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
    .select(PROFILE_ALL_DATA_QUERY)
    .eq("id", userId)
    .returns<ProfileAllDataRow[]>();

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

export const insertFollow = async ({ myId, opponentId }: { myId: string; opponentId: string }) => {
  const { error } = await supabase.from("follow").insert({ myId, opponentId });

  if (error) throw Error("팔로우 실패");
};
