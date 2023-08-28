import type { ComponentProps } from "react";
import type { Card } from ".";

export const useCard = (project: ComponentProps<typeof Card>) => {
  return { project };
};
