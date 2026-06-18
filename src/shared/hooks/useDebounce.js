/**
 * Хук useDebounce
 *
 * Возвращает "отложенное" значение, которое обновляется только спустя указанную задержку.
 * Полезно для оптимизации частых событий: ввод текста, resize, scroll, фильтры, поиск.
 *
 * @param {*} value — исходное значение, которое меняется слишком часто
 * @param {number} delay — задержка в миллисекундах (по умолчанию 300 мс)
 * @returns {*} debouncedValue — значение, обновлённое только после паузы
 *
 * Пример:
 * const debouncedSearch = useDebounce(searchQuery, 500);
 * // API-запрос выполнится только если пользователь перестал печатать 0.5 сек
 */
import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 300) => {
  // Храним "отложенное" значение
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Запускаем таймер: если value не меняется delay мс — обновляем debouncedValue
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Если value или delay изменились раньше — очищаем таймер
    // Это предотвращает лишние обновления
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]); // Перезапуск эффекта при изменении value или delay

  return debouncedValue;
};

export default useDebounce;
