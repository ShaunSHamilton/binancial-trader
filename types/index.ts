export type ErrType = {
  message: string;
  suggestion: string;
};

export type Prom<T> = Promise<T | ErrType>;
