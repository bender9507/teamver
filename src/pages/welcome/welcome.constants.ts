import {
  Area,
  Blog,
  Introduce,
  Job,
  Language,
  Name,
  Personality,
  Position,
  ProfileImage,
  ProjectType,
  Role,
  Skill
} from "./components";

export const rules = {
  required: true,
  minLength: 1
} as const;

export const stepComponents = {
  introduce: { component: Introduce, required: true },
  name: { component: Name, required: true },
  languages: { component: Language, required: true },
  skills: { component: Skill, required: true },
  positions: { component: Position, required: true },
  projectTypes: { component: ProjectType, required: true },
  personalities: { component: Personality, required: true },
  areas: { component: Area, required: true },
  blog: { component: Blog, required: false },
  job: { component: Job, required: true },
  imageUrl: { component: ProfileImage, required: true },
  role: { component: Role, required: true }
} as const;
