import type { ConstantMapKey, SelectedConstantMap } from ".";
import { supabase } from "../config";

export const getConstantAreas = async () => {
  const { data, error } = await supabase.from("constantAreas").select("*");

  if (error) throw error;

  return data;
};

export const getConstantJobs = async () => {
  const { data, error } = await supabase.from("constantJobs").select("*");

  if (error) throw error;

  return data;
};

export const getConstantLanguages = async () => {
  const { data, error } = await supabase.from("constantLanguages").select("*");

  if (error) throw error;

  return data;
};

export const getConstantPersonalities = async () => {
  const { data, error } = await supabase.from("constantPersonalities").select("*");

  if (error) throw error;

  return data;
};

export const getConstantProjectTypes = async () => {
  const { data, error } = await supabase.from("constantProjectTypes").select("*");

  if (error) throw error;

  return data;
};

export const getConstantPositions = async () => {
  const { data, error } = await supabase.from("constantPositions").select("*");

  if (error) throw error;

  return data;
};

export const getConstantReactions = async () => {
  const { data, error } = await supabase.from("constantReactions").select("*");

  if (error) throw error;

  return data;
};

export const getConstantSkills = async () => {
  const { data, error } = await supabase.from("constantSkills").select("*");

  if (error) throw error;

  return data;
};

export const getConstantRoles = async () => {
  const { data, error } = await supabase.from("constantRoles").select("*");

  if (error) throw error;

  return data;
};

export const constantMap = {
  areas: getConstantAreas,
  jobs: getConstantJobs,
  languages: getConstantLanguages,
  personalities: getConstantPersonalities,
  projectTypes: getConstantProjectTypes,
  positions: getConstantPositions,
  reactions: getConstantReactions,
  skills: getConstantSkills,
  roles: getConstantRoles
} as const;

export const getConstants = async <T extends ConstantMapKey[]>(tables: T) => {
  const promises = tables.map(
    (table) => typeof constantMap[table] === "function" && constantMap[table]()
  );

  const results = await Promise.all(promises);

  return tables.reduce(
    (acc, table, index) => ({ ...acc, [table]: results[index] }),
    {} as SelectedConstantMap<T>
  );
};
