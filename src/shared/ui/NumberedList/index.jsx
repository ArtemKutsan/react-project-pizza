import { cn } from '@/shared/lib/cn';

const NumberedList = ({ items = [], className = '', itemClassName = '' }) => {
  return (
    <ol className={cn('space-y-6', className)}>
      {items.map((item, index) => (
        <li key={item} className={cn('grid grid-cols-[auto_1fr] gap-4', itemClassName)}>
          <span className="flex size-8 items-center justify-center rounded-full bg-lime-700 text-sm font-semibold text-white">
            {index + 1}
          </span>
          <p className="pt-1 text-slate-600">{item}</p>
        </li>
      ))}
    </ol>
  );
};

export default NumberedList;
