import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { styleHelper } from "~/styles/utils";
import { getObjectEntries } from "~/utils";
import type { PosCenterXProps, PosCenterYProps, PositionProps } from "./position.types";

export const position = ({ ...props }: PositionProps) => css`
  ${getObjectEntries(props).map(([key, value]) => styleHelper(key, value))}
`;

const absolute = (props: Omit<PositionProps, "position">) => css`
  ${position({ position: "absolute", ...props })}
`;

const fixed = (props: Omit<PositionProps, "position">) => css`
  ${position({ position: "fixed", ...props })}
`;

const sticky = (props: Omit<PositionProps, "position">) => css`
  ${position({ position: "sticky", ...props })}
`;

const posCenter = () => css`
  ${position({ position: "absolute", top: "50%", left: "50%" })}

  transform: translate(-50%, -50%);
`;

const posCenterX = (props: PosCenterXProps = {}) => css`
  ${position({ ...props, left: "50%" })}

  transform: translateX(-50%);
`;

const posCenterY = (props: PosCenterYProps = {}) => css`
  ${position({ ...props, top: "50%" })}

  transform: translateY(-50%);
`;

position.absolute = absolute;
position.fixed = fixed;
position.sticky = sticky;
position.posCenter = posCenter;
position.posCenterX = posCenterX;
position.posCenterY = posCenterY;

export const Position = styled.div<PositionProps>`
  ${(props) => position(props)}
`;

export const PosCenter = styled.div`
  ${posCenter()}
`;

export const PosCenterX = styled.div<PosCenterXProps>`
  ${(props) => posCenterX(props)}
`;

export const PosCenterY = styled.div<PosCenterYProps>`
  ${(props) => posCenterY(props)}
`;
