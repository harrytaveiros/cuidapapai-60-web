import { Outlet, useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import BottomNav from './BottomNav';

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col text-slate-800 antialiased">
      {/* Cabeçalho verde escuro no topo */}
      <header className="sticky top-0 z-40 bg-primary text-white shadow-md">
        <div className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">
          {/* Tarefa 1: Logo atualizado para CuidaPapai+50 */}
          <Link
            to="/home"
            className="text-xl font-bold tracking-tight select-none flex items-center gap-0.5 hover:opacity-95 transition"
          >
            <span className="text-white">CuidaPapai</span>
            <span className="text-secondary font-extrabold">+50</span>
          </Link>

          {/* Tarefa 1: Botão de Perfil (ícone User verde escuro dentro de círculo amarelo com navegação para /perfil) */}
          <button
            type="button"
            onClick={() => navigate('/perfil')}
            aria-label="Acessar Perfil"
            title="Acessar Perfil"
            className="bg-[#FBBF24] p-2 rounded-full cursor-pointer hover:opacity-80 transition flex items-center justify-center shadow-xs active:scale-95"
          >
            <User className="w-5 h-5 text-[#126E51]" />
          </button>
        </div>
      </header>

      {/* Conteúdo central com Outlet e pb-24 sm:pb-28 garantindo espaço seguro acima da BottomNav fixa */}
      <main className="flex-1 w-full max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto px-4 pt-4 sm:px-6 sm:pt-6 pb-24 sm:pb-28">
        <Outlet />
      </main>

      {/* Barra de navegação fixa no rodapé */}
      <BottomNav />
    </div>
  );
}
