import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { grid, size, text } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;

  ${({ theme: { colors } }) => css`
    box-shadow: inset 0 -1px 0 ${colors.content2};
  `}
`;

export const ItemContainer = styled.div<{ size: number }>`
  ${({ size }) => css`
    ${grid({ column: size, align: "center", justify: "center" })}
  `}
`;

export const Item = styled.div<{ selected: boolean }>`
  padding: 10px 0;

  ${text("heading5")};

  ${({ theme: { colors }, selected }) => css`
    color: ${colors[selected ? "content1" : "content2"]};
  `}
`;

export const FloatingBar = styled.div<{ size: number; selectedIndex: number }>`
  ${({ theme: { colors }, size: _size, selectedIndex }) => css`
    ${size({ width: `calc(${100 / _size}%)`, height: 1 })}

    background-color: ${colors.content1};

    transform: translateX(${selectedIndex * 100}%);
    transition: 300ms;
  `}
`;
