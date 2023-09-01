import type {
  FollowProjectInsert,
  InviteState,
  ProjectAllDataRow,
  ProjectDataInsert,
  ProjectDataRow,
  ProjectDataUpdate,
  ProjectInviteAllRow,
  ProjectInviteInsert,
  ProjectMembersInsert,
  ProjectMembersUpdate
} from ".";
import type { ChatRequestMemberRow } from "../chat/types";
import { supabase } from "../config";
import type {
  ConstantAreaRow,
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantSkillRow
} from "../constant";
import { PROJECT_ALL_DATA_QUERY } from "./constants";

export const selectProject = async (projectId: number) => {
  const { data, error } = await supabase
    .from("projects")
    .select(`${PROJECT_ALL_DATA_QUERY}`)
    .eq("id", projectId)
    .returns<ProjectAllDataRow[]>()
    .single();

  if (error) throw error;

  return data;
};

export const selectOwnerProjects = async (myId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select(`${PROJECT_ALL_DATA_QUERY}`)
    .eq("ownerId", myId)
    .returns<ProjectAllDataRow[]>();

  if (error) throw error;

  return data;
};

export const selectMemberProjects = async (myId: string) => {
  const { data, error } = await supabase
    .from("projectMembers")
    .select(`...projects!inner(${PROJECT_ALL_DATA_QUERY})`)
    .eq("memberId", myId)
    .returns<ProjectAllDataRow[]>();

  if (error) throw error;

  return data;
};

export const insertMemberToProject = async (projectMembersInsertData: ProjectMembersInsert) => {
  const { error } = await supabase.from("projectMembers").insert(projectMembersInsertData);

  if (error) throw error;
};

export const deleteMemberInProject = async ({ projectId, memberId }: ProjectMembersUpdate) => {
  const { error } = await supabase
    .from("projectMembers")
    .delete()
    .eq("projectId", projectId)
    .eq("memberId", memberId);

  if (error) throw error;
};

export const insertProject = async ({
  skills,
  languages,
  positions,
  areas,
  ...projectData
}: ProjectDataInsert & {
  areas: ConstantAreaRow["id"][];
  skills: ConstantSkillRow["id"][];
  languages: ConstantLanguageRow["id"][];
  positions: ConstantPositionRow["id"][];
}) => {
  const { data, error } = await supabase
    .from("projects")
    .insert(projectData)
    .select("*")
    .returns<ProjectDataRow[]>();

  if (error) throw Error("프로젝트 생성에 실패하였습니다.");

  const mapping = {
    projectLanguages: languages.map((id) => ({ languageId: id, projectId: data[0].id })),
    projectMembers: [{ memberId: projectData.ownerId, projectId: data[0].id }],
    projectPositions: positions.map((id) => ({ positionId: id, projectId: data[0].id })),
    projectSkills: skills.map((id) => ({ skillId: id, projectId: data[0].id })),
    projectAreas: areas.map((id) => ({ areaId: id, projectId: data[0].id }))
  };
  const tasks = Object.entries(mapping).map(async ([table, data]) => {
    const { error } = await supabase.from(table).insert(data);

    if (error) throw Error("프로젝트 생성 실패");
  });
  await Promise.all(tasks);
};

export const deleteProject = async (projectId: number) => {
  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) throw error;
};

export const updateProject = async ({
  skills,
  languages,
  positions,
  areas,
  ...projectData
}: Omit<ProjectDataUpdate, "id"> & {
  id: number;
  areas: ConstantAreaRow["id"][];
  skills: ConstantSkillRow["id"][];
  languages: ConstantLanguageRow["id"][];
  positions: ConstantPositionRow["id"][];
}) => {
  const { error } = await supabase.from("projects").update(projectData).eq("id", projectData.id);

  if (error) throw error;

  const mappings = {
    projectLanguages: languages.map((id) => ({ languageId: id, projectId: projectData.id })),
    projectPositions: positions.map((id) => ({ positionId: id, projectId: projectData.id })),
    projectSkills: skills.map((id) => ({ skillId: id, projectId: projectData.id })),
    projectAreas: areas.map((id) => ({ areaId: id, projectId: projectData.id }))
  };

  const tasks = Object.entries(mappings).map(async ([table, data]) => {
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("projectId", projectData.id);
    const { error: insertError } = await supabase.from(table).insert(data);

    if (deleteError || insertError) throw Error("업데이트 실패");
  });

  await Promise.all(tasks);
};

export const insertProjectInvite = async (projectInviteData: ProjectInviteInsert) => {
  const { error } = await supabase.from("projectInvite").insert(projectInviteData);

  if (error) throw error;
};

export const selectProjectInvites = async (receiverId: string) => {
  const { data, error } = await supabase
    .from("projectInvite")
    .select(`*, project:projects!inner(${PROJECT_ALL_DATA_QUERY})`)
    .eq("receiverId", receiverId)
    .eq("state", "PENDING")
    .returns<ProjectInviteAllRow[]>();

  if (error) throw error;

  return data;
};

export const updateProjectInviteState = async ({
  id,
  state
}: {
  id: number;
  state: InviteState;
}) => {
  const { error } = await supabase.from("projectInvite").update({ state }).eq("id", id);

  if (error) throw error;
};

export const insertFollowProject = async ({ followerId, projectId }: FollowProjectInsert) => {
  const { error } = await supabase.from("followProject").insert({ followerId, projectId });

  if (error) throw error;
};

export const selectFollowProjects = async (myId: string) => {
  const { data, error } = await supabase
    .from("followProject")
    .select(
      `id, project:projects!inner(${PROJECT_ALL_DATA_QUERY}), chatRequest:chatRequestMember(*)`
    )
    .eq("followerId", myId)
    .returns<{ id: number; project: ProjectAllDataRow; chatRequest: ChatRequestMemberRow[] }[]>();

  if (error) throw error;

  return data;
};

export const deleteFollowProject = async (followProjectId: number) => {
  const { error } = await supabase.from("followProject").delete().eq("id", followProjectId);

  if (error) throw error;
};

export const selectRecommendedProjects = async ({
  seedValue,
  userId,
  areas,
  projectType,
  pageParam = 0,
  limit = 10
}: {
  seedValue: number;
  userId: string;
  areas: ConstantAreaRow["id"][];
  projectType?: number;
  pageParam?: number;
  limit?: number;
}) => {
  let query = supabase
    .rpc("select_recommended_projects", { seedValue, userId, areas })
    .eq("state", "IN_RECRUIT");

  if (projectType) {
    query = query.eq("projectType", projectType);
  }

  const { data, error } = await query
    .range(pageParam * limit, (pageParam + 1) * limit - 1)
    .neq("ownerId", userId)
    .select(`*, ${PROJECT_ALL_DATA_QUERY}`)
    .returns<ProjectAllDataRow[]>();

  if (error) throw error;

  return { data, nextPage: data.length === limit ? pageParam + 1 : undefined };
};

export const updateProjectState = async ({
  id,
  state
}: {
  id: number;
  state: ProjectDataRow["state"];
}) => {
  const { error } = await supabase.from("projects").update({ state }).eq("id", id);

  if (error) throw error;
};
