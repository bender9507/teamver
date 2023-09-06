import type { ConstantAreaRow, ConstantProjectTypeRow } from "~/states/server/constant";

export interface FilterForm {
  areas: ConstantAreaRow["id"][];
  projectType?: ConstantProjectTypeRow["id"];
}
