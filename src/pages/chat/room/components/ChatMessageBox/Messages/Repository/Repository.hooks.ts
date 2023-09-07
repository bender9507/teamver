import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { useGetRepoQuery } from "~/states/server/github";
import type { Repository } from ".";

export const useRepository = ({ repoUrl }: ComponentProps<typeof Repository>) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { data: repo } = useGetRepoQuery(repoUrl, isEnabled);

  const repoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsEnabled(true);
        observer.disconnect();
      }
    });

    if (repoRef.current) {
      observer.observe(repoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [repoRef]);

  return {
    repo,
    repoRef
  };
};
