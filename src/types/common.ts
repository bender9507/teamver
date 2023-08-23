import type { Theme } from "@emotion/react";
import type { CSSProperties, Dispatch, ReactElement, SetStateAction } from "react";
import type { languages } from "~/constants/languages";

export type OneOf<T extends readonly unknown[]> = T[number];

export type PickUnion<T, U> = T extends U ? T : never;

export type ValueOf<T> = T[keyof T];

export type WithTheme<T = unknown> = T & { theme: Theme };

export type WithStyle<T = unknown> = T & { style?: CSSProperties };

export type WithAs<T = unknown> = T & { as?: keyof JSX.IntrinsicElements };

export type PropsWithElement<T = unknown> = T & { children: ReactElement };

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type Args<T> = T extends (...args: infer A) => void ? A : false;

export type HasArgs<T> = Args<T> extends [] ? false : true;

export type OneOfLanguage = (typeof languages)[number];
