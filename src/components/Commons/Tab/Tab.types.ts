export interface TabProps {
  items: { id: string; label: string }[];
  selectedItem: string;
  onClick: (id: string) => void;
}
