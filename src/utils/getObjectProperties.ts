export type ObjectType = Record<PropertyKey, unknown>;

export type ObjectKeys<K extends ObjectType> = Exclude<keyof K, symbol>;

export const getObjectKeys = <T extends ObjectType>(obj: T) => {
  return Object.keys(obj) as Array<ObjectKeys<T>>;
};

export const getObjectValues = <T extends ObjectType>(obj: T) => {
  return Object.values(obj) as Array<T[ObjectKeys<T>]>;
};

export const getObjectEntries = <T extends ObjectType>(obj: T) => {
  return Object.entries(obj) as Array<[ObjectKeys<T>, T[ObjectKeys<T>]]>;
};
