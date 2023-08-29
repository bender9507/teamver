export interface ProjectEditForm {
  name: string;
  projectType: string;
  description: string;
  positions: string[];
  recruitCount: string;
  languages: string[];
  skills: string[];
  areas: string[];
  imageUrl: File;
  startDate: Date | null;
  endDate: Date | null;
}
