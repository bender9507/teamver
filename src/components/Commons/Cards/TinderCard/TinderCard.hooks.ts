import type { ComponentProps, MouseEvent, TouchEvent } from "react";
import { useState } from "react";
import { useLockBodyScroll } from "react-use";
import { useImmutableState } from "~/hooks";
import type { TinderCard } from ".";

export const useTinderCard = ({
  onConfirm,
  onCancel,
  onClick
}: ComponentProps<typeof TinderCard>) => {
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

  const [selectedDirection, setSelectedDirection] = useState<"right" | "left" | null>(null);

  useLockBodyScroll(drag.state);

  const handleDown = (x: number, y: number) => {
    setDrag({ state: true, startPos: { x, y } });
    setAnimation({ transition: 0 });
  };

  const handleMove = (x: number, y: number, width: number) => {
    const {
      startPos: { x: startX, y: startY }
    } = drag;

    if (drag.state) {
      const movePosX = x - startX;
      const minMovePosX = width / 3;

      if (Math.abs(movePosX) > minMovePosX) {
        setSelectedDirection(movePosX > 0 ? "right" : "left");
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
      setAnimation({
        transition: 300,
        translatePos: { x: animation.translatePos.x * 4, y: animation.translatePos.y * 4 },
        event: false
      });

      setTimeout(() => {
        if (selectedDirection === "left") {
          onCancel();
        } else if (selectedDirection === "right") {
          onConfirm();
        }
      }, 300);
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
    currentTarget: { offsetWidth }
  }: MouseEvent<HTMLDivElement>) => {
    handleMove(clientX, clientY, offsetWidth);
  };

  const handleTouchMove = ({
    touches,
    currentTarget: { offsetWidth }
  }: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = touches[0];

    handleMove(clientX, clientY, offsetWidth);
  };

  const handleConfirm = () => {
    setAnimation({ translatePos: { x: 500, y: -100 }, rotate: 30, opacity: 0 });

    setTimeout(onConfirm, 300);
  };

  const handleCancel = () => {
    setAnimation({ translatePos: { x: -500, y: -100 }, rotate: -30, opacity: 0 });

    setTimeout(onConfirm, 300);
  };

  return {
    animation,
    selectedDirection,
    handleMouseDown,
    handleMouseMove,
    handleUp,
    handleTouchMove,
    handleTouchStart,
    handleConfirm,
    handleCancel
  };
};
