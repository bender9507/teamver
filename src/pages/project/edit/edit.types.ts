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
