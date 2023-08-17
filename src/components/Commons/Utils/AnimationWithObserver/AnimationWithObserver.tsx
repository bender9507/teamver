import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";
import { Animation, type AnimationProps } from "../Animation";

import { useIntersecting } from "~/hooks";

export const AnimationWithObserver = (props: PropsWithChildren<Omit<AnimationProps, "mode">>) => {
  const [mode, setMode] = useState<AnimationProps["mode"]>("none");

  const animationRef = useRef<HTMLDivElement | null>(null);

  const { isIntersecting, connect, disconnect } = useIntersecting(animationRef);

  useEffect(() => {
    setMode(isIntersecting ? "in" : "none");
  }, [isIntersecting]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect, mode]);

  return <Animation ref={animationRef} mode={mode} {...props} />;
};
