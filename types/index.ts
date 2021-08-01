export type ErrType = {
  message: string;
  suggestion: string;
};

export type Prom<T> = Promise<T | ErrType>;

export function assertErrType(x: unknown): x is ErrType {
  return (x as ErrType).message !== undefined;
}
