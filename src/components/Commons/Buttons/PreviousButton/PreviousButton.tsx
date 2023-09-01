import { useRouter } from "next/router";
import { IconButton } from "..";
import type { PreviousButtonProps } from "./PreviousButton.types";

export const PreviousButton = ({ name = "arrowBack", onPrevious }: PreviousButtonProps) => {
  const router = useRouter();

  return (
    <IconButton
      name={name}
      color="content1"
      onClick={async () => {
        if (onPrevious) {
          const shouldNavigate = await onPrevious();

          if (!shouldNavigate) {
            return;
          }
        }

        router.back();
      }}
    />
  );
};
