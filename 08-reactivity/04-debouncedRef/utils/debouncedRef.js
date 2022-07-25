import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  let refVal = source.value;
  const debounced = ref(refVal);

  let deb = debounce((val) => {
    debounced.value = val;
  }, wait);

  watch(
    source,

    (newVal, oldVal) => {
      deb(newVal);
    },
  );

  return debounced;
}
