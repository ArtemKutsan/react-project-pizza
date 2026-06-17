import { cn } from '@/shared/lib/cn';

const BulletList = ({ items = [], className = '', itemClassName = '' }) => {
  return (
    <ul className={cn('space-y-4', className)}>
      {items.map((item) => (
        <li key={item} className={cn('flex items-center gap-4', itemClassName)}>
          <span className="ml-3 size-2 rounded-full bg-secondary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
