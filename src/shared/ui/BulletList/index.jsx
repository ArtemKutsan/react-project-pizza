import { cn } from '@/shared/lib/cn';

const BulletList = ({ items = [], renderItem, className = '', itemClassName = '' }) => {
  return (
    <ul className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const itemKey = typeof item === 'string' ? item : index;

        return (
          <li key={itemKey} className={cn('flex items-center gap-4 text-slate-600', itemClassName)}>
            <span className="ml-3 size-2 rounded-full bg-lime-700" aria-hidden="true" />
            <span>{renderItem ? renderItem(item, index) : item}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default BulletList;
