import type { ReactNode } from "react";
import { create } from "zustand";

interface OverlayStore {
  overlays: Map<string, ReactNode>;
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
}

const initialState = {
  overlays: new Map()
} as const;

export const useOverlayStore = create<OverlayStore>((set) => ({
  ...initialState,
  mount: (id, element) =>
    set((prevState) => {
      const _overlays = new Map(prevState.overlays);
      _overlays.set(id, element);

      return { ...prevState, overlays: _overlays };
    }),
  unmount: (id) =>
    set((prevState) => {
      const _overlays = new Map(prevState.overlays);
      _overlays.delete(id);

      return { ...prevState, overlays: _overlays };
    })
}));
