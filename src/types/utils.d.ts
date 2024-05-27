export type Payload = {
  uuid: string;
};
type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;