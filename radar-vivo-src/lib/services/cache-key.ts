export function createCacheKey(
  namespace: string,
  value: string
): string {

  return `${namespace}:${value.toLowerCase().trim()}`;

}
