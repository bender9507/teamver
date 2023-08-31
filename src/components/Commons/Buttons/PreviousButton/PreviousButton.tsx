import { useRouter } from "next/router";
import { IconButton } from "..";
import type { PreviousButtonProps } from "./PreviousButton.types";

export const PreviousButton = ({ name = "arrowBack" }: PreviousButtonProps) => {
  const router = useRouter();

  return <IconButton name={name} color="content1" onClick={router.back} />;
};
