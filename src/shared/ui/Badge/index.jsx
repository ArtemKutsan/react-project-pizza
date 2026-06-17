import { cn } from '@/shared/lib/cn';

const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={cn(
        'w-fit rounded-full bg-secondary/5 px-4 py-2 text-sm text-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
