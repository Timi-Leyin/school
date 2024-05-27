import { ExcludeKeys } from "@/types/utils";

function exclude<Type, K extends keyof Type>(
  model: Type,
  keys: K[]
): ExcludeKeys<Type, K> {
  // @ts-ignore
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(model).filter(([key]) => !keys.includes(key as K))
  );
}

export default exclude
