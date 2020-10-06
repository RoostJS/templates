import { capitalize } from 'lodash';
/**
 * Capitalize A Word
 *
 * @note properly transforms wordpress to WordPress
 *
 * @param {string} word
 *
 * @return {string}
 */
export function toCap(word: string): string {
  word.toLowerCase();
  if (word === 'wordpress') return 'WordPress';
  return capitalize(word);
}
