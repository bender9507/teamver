import type { ReactNode } from "react";

export interface Item {
  id: string;
  name: string;
}

export interface FilterBaseProps {
  title: string;
  description: string;
  items: ReactNode;
  onSubmit: VoidFunction;
}
