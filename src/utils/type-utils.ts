export type NumericKeys<T> = keyof {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
};
