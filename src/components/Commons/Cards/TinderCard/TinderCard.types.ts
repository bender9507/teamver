export interface TinderCardProps {
  onSelect: (direction: "up" | "down" | "left" | "right") => void;
}

export interface TinderCardAnimation {
  transition: number;
  translatePos: { x: number; y: number };
  rotate: number;
  opacity: number;
  event: boolean;
}
