import { computed, unref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => {
    return computed(() =>
      func.apply(
        this,
        args.map((ele) => unref(ele)),
      ),
    );
  };
}
