import * as Styled from "./SectionTab.styles";
import type { TabProps } from "./SectionTab.types";

export const SectionTab = ({ items, selectedId, onClick }: TabProps) => {
  const selectedIndex = items.findIndex((item) => item.id === selectedId);

  return (
    <Styled.Container>
      <Styled.ItemContainer size={items.length}>
        {items.map((item) => (
          <Styled.Item
            key={item.id}
            selected={selectedId === item.id}
            onClick={() => onClick(item.id)}
          >
            {item.label}
          </Styled.Item>
        ))}
      </Styled.ItemContainer>

      <Styled.FloatingBar size={items.length} selectedIndex={selectedIndex} />
    </Styled.Container>
  );
};
