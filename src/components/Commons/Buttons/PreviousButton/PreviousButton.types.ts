import type * as svgList from "~/assets/icons";

export interface PreviousButtonProps {
  name?: keyof typeof svgList;
  onPrevious?: () => Promise<boolean>;
}
