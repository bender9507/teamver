import { useState } from "react";

type Update<T> = (prevState: T) => Partial<T>;

export const useImmutableState = <T>(props: T) => {
  const [state, setState] = useState(props);

  const _setState = (update: Partial<T> | Update<T>) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof update === "function" ? update(prevState) : update)
    }));
  };

  return [state, _setState] as const;
};
