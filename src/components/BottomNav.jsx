import { NavLink, useInRouterContext } from 'react-router-dom';
import { Home, Calendar, Heart, Users } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Início', ariaLabel: 'Home', path: '/home', icon: Home },
  { id: 'calendar', label: 'Agenda', ariaLabel: 'Calendar', path: '/agenda', icon: Calendar },
  { id: 'heart', label: 'Saúde', ariaLabel: 'Heart', path: '/saude', icon: Heart },
  { id: 'users', label: 'Cuidadores', ariaLabel: 'Users', path: '/cuidadores', icon: Users },
];

export default function BottomNav({ activeItem, onChange }) {
  const inRouter = useInRouterContext();

  // Quando renderizado dentro do contexto do react-router
  if (inRouter) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-slate-200 shadow-lg"
        aria-label="Navegação inferior"
      >
        <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                role="button"
                aria-label={item.ariaLabel}
                title={item.ariaLabel}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 py-1 px-2 text-xs font-medium transition-colors select-none ${
                    isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isActive ? 'text-primary stroke-[2.5px] scale-110' : 'text-slate-400 stroke-2'
                      }`}
                      aria-hidden="true"
                    />
                    <span className={`text-[11px] mt-1 ${isActive ? 'font-semibold text-primary' : 'font-normal'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  // Fallback quando renderizado fora do Router (ex: testes unitários isolados)
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-slate-200 shadow-lg"
      aria-label="Navegação inferior"
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem ? activeItem === item.id : item.id === 'home';
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange?.(item.id)}
              aria-label={item.ariaLabel}
              title={item.ariaLabel}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 text-xs font-medium transition-colors select-none ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform duration-200 ${
                  isActive ? 'text-primary stroke-[2.5px] scale-110' : 'text-slate-400 stroke-2'
                }`}
                aria-hidden="true"
              />
              <span className={`text-[11px] mt-1 ${isActive ? 'font-semibold text-primary' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
