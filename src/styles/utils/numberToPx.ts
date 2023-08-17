export const numberToPx = (number: number | string | undefined) => {
  return typeof number === "number" ? `${number}px` : number;
};
