import * as Styled from "./Tab.styles";
import type { TabProps } from "./Tab.types";

export const Tab = ({ items, selectedItem, onClick }: TabProps) => {
  const selectedIndex = items.findIndex((item) => item.id === selectedItem);

  return (
    <Styled.Container>
      <Styled.ItemContainer size={items.length}>
        {items.map((item) => (
          <Styled.Item
            key={item.id}
            selected={selectedItem === item.id}
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
