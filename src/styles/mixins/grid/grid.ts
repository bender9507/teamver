import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { styleHelper } from "~/styles/utils";
import type { GridProps } from "./grid.types";

export const GRID_MAP = {
  between: "space-between",
  around: "space-around",
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch"
} as const;

export const grid = ({
  column,
  rowGap,
  columnGap,
  gap,
  autoColumnSize,
  align,
  justify,
  padding
}: GridProps = {}) => css`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${`repeat(${column}, ${autoColumnSize ? "auto" : "1fr"})`};

  ${gap && styleHelper("gap", gap)};
  ${rowGap && styleHelper("rowGap", rowGap)};
  ${columnGap && styleHelper("columnGap", columnGap)};
  ${justify && styleHelper("justifyItems", justify)};
  ${align && styleHelper("alignItems", align)};
  ${padding && styleHelper("padding", padding)};
`;

export const Grid = styled.div<GridProps>`
  ${(props) => grid(props)}
`;
