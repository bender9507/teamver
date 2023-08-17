import { useEffect, useRef, useState } from "react";

export const useProgress = (second: number) => {
  const [start, setStart] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const animationFrame = useRef(0);

  const connect = () => {
    setStart(Date.now() - elapsed);
    setIsRunning(true);
  };

  const disconnect = () => {
    setIsRunning(false);
  };

  const value = Math.floor((elapsed / (second * 1000)) * 100);

  const isEnd = value >= 100;

  useEffect(() => {
    if (isRunning && elapsed < second * 1000) {
      animationFrame.current = requestAnimationFrame(() => {
        setElapsed(Date.now() - start);
      });

      return () => cancelAnimationFrame(start);
    }
  }, [elapsed, isRunning, second, start]);

  return { value, connect, disconnect, isEnd };
};
