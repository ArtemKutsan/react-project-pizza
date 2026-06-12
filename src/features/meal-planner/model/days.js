// src/features/meal-planner/model/days.js

// Список дней недели с их индексами и меткой для отображения
const days = [
  { label: 'Monday', dayIndex: 1 },
  { label: 'Tuesday', dayIndex: 2 },
  { label: 'Wednesday', dayIndex: 3 },
  { label: 'Thursday', dayIndex: 4 },
  { label: 'Friday', dayIndex: 5 },
  { label: 'Saturday', dayIndex: 6 },
  { label: 'Sunday', dayIndex: 0 },
];

// Функция getDays возвращает массив дней недели, добавляя свойство active, которое указывает, является ли день текущим днем недели
export const getDays = () => {
  // Получаем индекс текущего дня недели (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const currentDayIndex = new Date().getDay();

  // Проходим по массиву дней и добавляем свойство active, которое будет true для текущего дня недели
  return days.map((day) => ({
    // Распаковываем свойства дня и добавляем свойство active, которое будет true, если индекс дня совпадает с индексом текущего дня недели
    ...day,
    // Устанавливаем active в true, если индекс дня совпадает с индексом текущего дня недели, иначе false
    active: day.dayIndex === currentDayIndex,
  }));
};
