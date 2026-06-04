import { cn } from '@/shared/lib/cn';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={cn('rounded-full bg-emerald-50 px-4 py-2 text-sm text-lime-700', className)}>
      {children}
    </span>
  );
};

export default Badge;
