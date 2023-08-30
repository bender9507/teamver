export interface TinderCardProps {
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  onRestore?: VoidFunction;
  withSelectBox?: boolean;
}

export interface TinderCardAnimation {
  transition: number;
  translatePos: { x: number; y: number };
  rotate: number;
  opacity: number;
  event: boolean;
}
