export type Response<T> =
  | { data: T; error?: never }
  | { data?: never; error: string };
