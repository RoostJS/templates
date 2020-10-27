/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// src/utils/array-util.ts
/**
 * Search Array for object
 *
 * @param {any[]} haystack
 * @param {string} key
 * @param {any} value
 *
 * @return {object} {index: string, value: any}
 */
export function searchArray(
  haystack: any[],
  key: string,
  value: any
): { index: number; value: any } | undefined {
  const index: number = haystack.findIndex(x => x[key] === value);
  if (index < 0) return undefined;
  return { index, value: haystack[index] };
}
