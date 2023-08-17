import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export const useIntersecting = (target: MutableRefObject<HTMLElement | null>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const connect = useCallback(() => {
    if (target.current) {
      observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
        setIsIntersecting(isIntersecting);
      });

      observer.current.observe(target.current);
    }
  }, [target]);

  const disconnect = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { isIntersecting, connect, disconnect };
};
