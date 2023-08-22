import type { ConstantMapKey, SelectedConstantMap } from ".";
import { supabase } from "../config";
import { constantMap } from "./constants";

export const getConstants = async <T extends ConstantMapKey[]>(tables: T) => {
  const promises = tables.map(async (table) => {
    const { data, error } = await supabase.from(constantMap[table]).select("*");

    if (error) throw error;

    return data;
  });

  const results = await Promise.all(promises);

  return tables.reduce(
    (acc, table, index) => ({ ...acc, [table]: results[index] }),
    {} as SelectedConstantMap<T>
  );
};
