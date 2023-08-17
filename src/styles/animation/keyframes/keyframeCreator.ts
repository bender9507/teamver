import { keyframes } from "@emotion/react";
import { numberToPx } from "~/styles/utils";

type Translate = number | `${number}px` | `${number}%` | `${number}vw` | `${number}vh`;

export interface KeyframeProperties {
  opacity?: number;
  translate?: { x: Translate; y: Translate };
  translateX?: Translate;
  translateY?: Translate;
  rotate?: `${number}deg`;
  scale?: number;
}

export const keyframeCreator = (start: KeyframeProperties, end: KeyframeProperties) => {
  const generateProperties = (obj: KeyframeProperties) => {
    const transformProperties: string[] = [];

    const properties = Object.entries(obj).reduce((acc, [key, value]) => {
      const propertyKey = key as keyof KeyframeProperties;

      const isTransformProperty = [
        "translateX",
        "translateY",
        "translate",
        "rotate",
        "scale"
      ].includes(propertyKey);

      if (isTransformProperty) {
        switch (propertyKey) {
          case "translate":
            transformProperties.push(`translateX(${numberToPx(value.x)})`);
            transformProperties.push(`translateY(${numberToPx(value.y)})`);
            break;
          case "translateX":
          case "translateY":
            transformProperties.push(`${propertyKey}(${numberToPx(value)})`);
            break;
          default:
            transformProperties.push(`${propertyKey}(${value})`);
            break;
        }
      } else {
        acc.push(`${propertyKey}: ${value};`);
      }

      return acc;
    }, [] as string[]);

    if (transformProperties.length) {
      properties.push(`transform: ${transformProperties.join(" ")};`);
    }

    return properties.join(" ");
  };

  return keyframes`${`0% { ${generateProperties(start)} } 100% { ${generateProperties(end)} }`}`;
};
