import type { ComponentProps, MouseEvent, TouchEvent } from "react";
import { useState } from "react";
import { useLockBodyScroll } from "react-use";
import { useImmutableState } from "~/hooks";
import type { TinderCard } from ".";

export const useTinderCard = ({ onSelect }: ComponentProps<typeof TinderCard>) => {
  const [drag, setDrag] = useImmutableState({
    state: false,
    startPos: { x: 0, y: 0 }
  });

  const [animation, setAnimation] = useImmutableState({
    transition: 0,
    translatePos: { x: 0, y: 0 },
    rotate: 0,
    opacity: 1,
    event: true
  });

  const [selectedDirection, setSelectedDirection] = useState<
    "up" | "right" | "down" | "left" | null
  >(null);

  useLockBodyScroll(drag.state);

  const handleDown = (x: number, y: number) => {
    setDrag({ state: true, startPos: { x, y } });
    setAnimation({ transition: 0 });
  };

  const handleMove = (x: number, y: number, width: number, height: number) => {
    const {
      state,
      startPos: { x: startX, y: startY }
    } = drag;

    if (state) {
      const movePosX = x - startX;
      const minMovePosX = width / 3;

      const movePosY = y - startY;
      const minMovePosY = height / 3;

      if (Math.abs(movePosX) > minMovePosX) {
        setSelectedDirection(movePosX > 0 ? "right" : "left");
      } else if (Math.abs(movePosY) > minMovePosY) {
        setSelectedDirection(movePosY > 0 ? "down" : "up");
      } else {
        setSelectedDirection(null);
      }

      setAnimation({
        translatePos: { x: x - startX, y: y - startY },
        rotate: (x - startX) / 20
      });
    }
  };

  const handleUp = () => {
    if (selectedDirection) {
      setAnimation({ transition: 600, opacity: 0, event: false });

      setTimeout(() => onSelect(selectedDirection), 600);
    } else {
      setAnimation({
        transition: 300,
        translatePos: { x: 0, y: 0 },
        rotate: 0
      });
    }

    setDrag({ state: false, startPos: { x: 0, y: 0 } });
  };

  const handleMouseDown = ({ clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    handleDown(clientX, clientY);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];

    handleDown(clientX, clientY);
  };

  const handleMouseMove = ({
    clientX,
    clientY,
    currentTarget: { offsetWidth, offsetHeight }
  }: MouseEvent<HTMLDivElement>) => {
    handleMove(clientX, clientY, offsetWidth, offsetHeight);
  };

  const handleTouchMove = ({
    touches,
    currentTarget: { offsetWidth, offsetHeight }
  }: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = touches[0];

    handleMove(clientX, clientY, offsetWidth, offsetHeight);
  };

  return {
    animation,
    handleMouseDown,
    handleMouseMove,
    handleUp,
    handleTouchMove,
    handleTouchStart
  };
};
