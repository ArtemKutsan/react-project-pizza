import { cn } from '@/shared/lib/cn';

const buttonVariants = {
  default: 'bg-lime-700 text-white hover:bg-lime-800',
  destructive: 'bg-rose-600 text-white hover:bg-rose-700',
  outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
  link: 'bg-transparent text-lime-700 underline-offset-4 hover:underline',
};

const buttonSizes = {
  default: 'min-h-10 min-w-10 px-4 py-2 text-base has-[>svg]:px-3',
  xs: "min-h-6 min-w-6 gap-1 rounded-lg px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: 'min-h-8 min-w-8 gap-1.5 rounded-xl px-3 py-1.5 text-sm has-[>svg]:px-2.5',
  lg: 'min-h-12 min-w-12 gap-3 px-6 py-2.5 rounded-2xl text-lg has-[>svg]:px-4',
  icon: 'size-10 rounded-full',
};

const Button = ({
  as: Component = 'button',
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'inline-flex w-fit items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      type={Component === 'button' ? type : undefined}
      {...props}
    />
  );
};

export default Button;
