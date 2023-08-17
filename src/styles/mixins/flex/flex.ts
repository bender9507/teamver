import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { styleHelper } from "~/styles/utils";
import type { FlexCenterProps, FlexColumnProps, FlexProps } from "./flex.types";

export const FLEX_MAP = {
  between: "space-between",
  around: "space-around",
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch"
} as const;

export const flex = ({ display = "flex", direction, align, justify, gap, wrap }: FlexProps) => css`
  display: ${display};
  ${direction && styleHelper("flexDirection", direction)}
  ${align && styleHelper("alignItems", FLEX_MAP[align])}
  ${justify && styleHelper("justifyContent", FLEX_MAP[justify])}
  ${gap && styleHelper("gap", gap)}
  ${wrap && styleHelper("flexWrap", wrap)}
`;

const center = (props: FlexCenterProps = {}) => {
  return flex({ ...props, align: "center", justify: "center" });
};

const column = (props: FlexColumnProps = {}) => {
  return flex({ ...props, direction: "column" });
};

flex.center = center;
flex.column = column;

export const Flex = styled.div<FlexProps>`
  ${(props) => flex(props)}
`;

export const FlexCenter = styled.div<FlexCenterProps>`
  ${(props) => flex.center(props)}
`;

export const FlexColumn = styled.div<FlexColumnProps>`
  ${(props) => flex.column(props)}
`;
