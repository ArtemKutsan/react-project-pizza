import { cn } from '@/shared/lib/cn';

const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/87.5',
  destructive:
    'bg-destructive/10 dark:bg-destructive/20 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/30',
  outline: 'border hover:bg-lite hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/87.5',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

const buttonSizes = {
  default: 'min-h-10 min-w-10 px-4 has-[>svg]:px-3',
  xs: "min-h-6 min-w-6 gap-1 rounded-sm px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: 'min-h-8 min-w-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  lg: 'min-h-12 min-w-12 rounded-xl px-6 has-[>svg]:px-4 gap-3',
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
        'inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
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
