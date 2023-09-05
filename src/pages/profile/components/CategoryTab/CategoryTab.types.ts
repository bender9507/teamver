export interface TabProps {
  items: { id: string; label: string }[];
  selectedId: string;
  onClick: (id: string) => void;
}
