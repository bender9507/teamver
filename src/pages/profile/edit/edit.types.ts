export interface ProfileEditForm {
  positions: string[];
  projectTypes: string[];
  skills: string[];
  languages: string[];
  personalities: string[];
  job: string;
  areas: string[];
  imageUrl: File;
  name: string;
  introduce: string;
  blog: string | null;
}

export interface EditProfileProps {
  userId: string;
}
