import { Fragment } from "react";
import { useOverlayStore } from "~/states/client";

export const Overlay = () => {
  const overlays = useOverlayStore((state) => state.overlays);

  return [...overlays.entries()].map(([id, element]) => <Fragment key={id}>{element}</Fragment>);
};
