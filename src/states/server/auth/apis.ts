import type { PROVIDER_LIST } from "~/constants";
import type { OneOf } from "~/types";
import { supabase } from "../config";
import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantProjectTypeRow,
  ConstantSkillRow
} from "../constant";
import type { ProfileRow } from "./types";

export const signUp = async (account: { email: string; password: string }) => {
  const { error } = await supabase.auth.signUp(account);

  if (error) throw error;
};

export const signInWithPassword = async (account: { email: string; password: string }) => {
  const { error } = await supabase.auth.signInWithPassword(account);

  if (error) throw error;
};

export const signInWithOAuth = async (provider: OneOf<typeof PROVIDER_LIST>) => {
  const { error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) throw error;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_profile").eq("id", userId).returns<
    | (ProfileRow & {
        skills: ConstantSkillRow[];
        projectTypes: ConstantProjectTypeRow[];
        personalities: ConstantPersonalityRow[];
        languages: ConstantLanguageRow[];
        jobs: ConstantJobRow[];
        areas: ConstantAreaRow[];
      })
    | null
  >();

  if (error) throw error;

  return data;
};
