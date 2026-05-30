import { NavLink } from 'react-router-dom';
import { RouterPath } from '@/shared/config/routerConfig';
import { navItems } from '@/widgets/Sidebar/navItems';

const navLinkBase =
  'flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-semibold transition-colors';
const navLinkActive = 'bg-emerald-50 text-emerald-800';
const navLinkIdle = 'text-slate-600 hover:bg-slate-50 hover:text-slate-900';

const Sidebar = () => {
  return (
    <aside
      className="flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 text-slate-900 lg:sticky lg:top-0 lg:h-screen max-md:min-h-0 max-md:w-full max-md:border-b max-md:border-r-0"
      aria-label="Primary"
    >
      <NavLink to={RouterPath.main} aria-label="Home">
        <span className="text-lg font-bold text-slate-900">RecipeBox</span>
      </NavLink>

      <nav className="flex-1 pt-4">
        <ul className="list-none space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkIdle}`
                }
              >
                <span className="size-2 rounded-full bg-current opacity-75" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
