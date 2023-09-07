import type { Dispatch, SetStateAction } from "react";

export interface ProfileSectionProps {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}
