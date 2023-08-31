import { supabase } from "../config";
import type {
  ConstantAreaRow,
  ConstantJobRow,
  ConstantLanguageRow,
  ConstantPersonalityRow,
  ConstantPositionRow,
  ConstantProjectTypeRow,
  ConstantReactionRow,
  ConstantRoleRow,
  ConstantSkillRow
} from "./types";

export const selectConstants = async () => {
  const { data: constants, error } = await supabase
    .rpc("select_constants")
    .select("*")
    .returns<
      {
        areas: ConstantAreaRow[];
        jobs: ConstantJobRow[];
        languages: ConstantLanguageRow[];
        personalities: ConstantPersonalityRow[];
        positions: ConstantPositionRow[];
        projectTypes: ConstantProjectTypeRow[];
        reactions: ConstantReactionRow[];
        roles: ConstantRoleRow[];
        skills: ConstantSkillRow[];
      }[]
    >()
    .single();

  if (error) throw Error("상수를 불러오는데 실패하였습니다.");

  return constants;
};
