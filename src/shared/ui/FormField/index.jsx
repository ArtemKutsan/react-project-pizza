import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';

const baseFieldClassName =
  'min-h-10 rounded-xl border px-4 py-1.5 outline-none transition-colors focus:border-primary';

const FormField = forwardRef(function FormField(
  { as: Component = 'input', label, className, containerClassName, labelClassName, id, ...props },
  ref,
) {
  return (
    <label className={cn('flex flex-col gap-2', containerClassName)}>
      <span className={cn('text-sm font-medium', labelClassName)}>{label}</span>
      <Component ref={ref} id={id} className={cn(baseFieldClassName, className)} {...props} />
    </label>
  );
});

export default FormField;
