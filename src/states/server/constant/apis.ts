import { supabase } from "../config";
import type { ConstantAllData } from "./types";

export const selectConstants = async () => {
  const { data: constants, error } = await supabase
    .rpc("select_constants")
    .select("*")
    .returns<ConstantAllData[]>()
    .single();

  if (error) throw Error("상수를 불러오는데 실패하였습니다.");

  return constants;
};
