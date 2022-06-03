/**
 * Функция, возвращающая сумму двух чисел
 *
 * @param {number} a - первое число
 * @param {number} b - второе целое
 * @return {number} сумма чисел a и b
 */

import * as _ from 'lodash';

// => [['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g']]
export function sum(a, b) {
  return _.sum([a, b]);
}
