import HomeIcon from '@/assets/icons/home.svg?react';
import LikeIcon from '@/assets/icons/like.svg?react';
import PlanIcon from '@/assets/icons/plan.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';
import TimerIcon from '@/assets/icons/timer.svg?react';
import Button from '@/shared/ui/Button';

const buttonShowcase = [
  { label: 'Default', variant: 'default' },
  { label: 'Destructive', variant: 'destructive' },
  { label: 'Outline', variant: 'outline' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Ghost', variant: 'ghost' },
  { label: 'Link', variant: 'link' },
];

const iconButtonShowcase = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Like', icon: LikeIcon },
  { label: 'Plan', icon: PlanIcon },
  { label: 'Timer', icon: TimerIcon },
  { label: 'Trash', icon: TrashIcon },
];

const buttonSizes = [
  { label: 'LG', size: 'lg' },
  { label: 'Default', size: 'default' },
  { label: 'SM', size: 'sm' },
  { label: 'XS', size: 'xs' },
];

const MainPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Main Page</h1>
        <p>Button reference surface and UI token preview</p>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Text buttons</h2>

        <div className="flex flex-wrap gap-4 items-end">
          {buttonShowcase.map((item) => (
            <Button key={item.label} variant={item.variant}>
              {item.label}
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Button sizes</h2>

        <div className="flex flex-wrap gap-4 items-end">
          {buttonSizes.map((item) => (
            <Button key={item.label} size={item.size}>
              {item.label}
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Icon buttons</h2>

        <div className="flex flex-wrap gap-4 items-end">
          {iconButtonShowcase.map((item) => {
            const Icon = item.icon;

            return (
              <Button key={item.label} variant="outline" size="icon" aria-label={item.label}>
                <Icon aria-hidden="true" />
              </Button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          {buttonSizes.map((item) => (
            <Button key={item.label} variant="outline" size={item.size} aria-label={item.label}>
              <HomeIcon aria-hidden="true" />
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
