import { useRef } from 'react';
import MealTypeSelectorItem from '../MealTypeSelectorItem';

const MealTypeSelector = ({ items, activeItem, onSelect }) => {
  // Реф для контейнера с типами блюд, который будет прокручиваться при клике на кнопки прокрутки
  const listRef = useRef(null);

  // Функция для прокрутки контейнера с типами блюд на заданное смещение (offset)
  const scroll = (offset) => {
    listRef.current?.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => scroll(-256)}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
        aria-label="Scroll meal types left"
      >
        ‹
      </button>

      <div ref={listRef} className="flex gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <MealTypeSelectorItem
            key={item.name}
            item={item}
            isActive={activeItem === item.name}
            onSelect={onSelect}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(256)}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
        aria-label="Scroll meal types right"
      >
        ›
      </button>
    </div>
  );
};

export default MealTypeSelector;
