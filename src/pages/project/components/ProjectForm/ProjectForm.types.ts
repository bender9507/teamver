import type { Control, UseFormReturn, UseFormStateReturn } from "react-hook-form";
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
} from "~/states/server/constant";
import type { ProjectAllDataRow } from "~/states/server/project";

export interface ProjectFormProps<T extends ProjectCreateFormType | ProjectEditFormType> {
  app: AppType<T>;
  isEditMode?: boolean;
  projectImage?: string;
}

export interface AppType<T extends ProjectCreateFormType | ProjectEditFormType> {
  control: Control<T>;
  constants: ConstantsType;
  formState: UseFormStateReturn<T>;
  project?: ProjectAllDataRow;
  register: UseFormReturn<T>["register"];
  handleCreateProject?: () => void;
  handleEditProject?: () => void;
  watch: UseFormReturn<T>["watch"];
  setValue: UseFormReturn<T>["setValue"];
  isSubmitting: boolean;
  startDateIsOpen: boolean;
  setStartDateIsOpen: BooleanController;
  endDateIsOpen: boolean;
  setEndDateIsOpen: BooleanController;
  handleBack: () => Promise<boolean>;
  isStartIndefinite: boolean;
  setStartIsIndefinite: (value: boolean) => void;
  isEndIndefinite: boolean;
  setEndIsIndefinite: (value: boolean) => void;
}

export interface ProjectCreateFormType {
  name: string;
  projectType: ConstantProjectTypeRow["id"];
  description: string;
  positions: ConstantPositionRow["id"][];
  recruitCount: string;
  languages: ConstantLanguageRow["id"][];
  skills: ConstantSkillRow["id"][];
  areas: ConstantAreaRow["id"][];
  imageUrl: File;
  startDate: Date | null | "미정";
  endDate: Date | null | "미정";
}

export interface ProjectEditFormType {
  name: string;
  imageUrl: File;
  projectType: string;
  description: string;
  positions: string[];
  recruitCount: string;
  languages: string[];
  skills: string[];
  areas: string[];
  startDate: Date | null | "미정";
  endDate: Date | null | "미정";
}

export interface ConstantsType {
  areas: ConstantAreaRow[];
  jobs: ConstantJobRow[];
  languages: ConstantLanguageRow[];
  personalities: ConstantPersonalityRow[];
  positions: ConstantPositionRow[];
  projectTypes: ConstantProjectTypeRow[];
  reactions: ConstantReactionRow[];
  roles: ConstantRoleRow[];
  skills: ConstantSkillRow[];
}

export interface BooleanController {
  on: () => void;
  off: () => void;
  toggle: () => void;
}
