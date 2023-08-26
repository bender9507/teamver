export const optionalSteps = ["blog"];

export const requiredSteps = [
  "name",
  "introduce",
  "languages",
  "skills",
  "positions",
  "projectTypes",
  "personalities",
  "areas",
  "jobs",
  "imageUrl",
  "role"
];

export const steps = [
  "name",
  "introduce",
  "languages",
  "skills",
  "positions",
  "projectTypes",
  "personalities",
  "areas",
  "blog",
  "jobs",
  "imageUrl",
  "role"
] as const;

export const rules = {
  required: true,
  minLength: 1
} as const;
