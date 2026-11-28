import { useState, useRef, useEffect } from 'react';
import { Clock, MoreVertical, Pencil, Trash2 } from 'lucide-react';

export default function AppointmentCard({
  date,
  time,
  title,
  subtitle,
  colorClass = 'bg-blue-600',
  onEdit,
  onDelete,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha o dropdown ao clicar fora ou pressionar Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleEditClick = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

  return (
    <div className="border-l-2 border-slate-200 ml-4 pl-8 relative pb-6 last:pb-2">
      {/* Ponto colorido da linha do tempo */}
      <span
        className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-white shadow-xs ${colorClass}`}
        aria-hidden="true"
      />

      {/* Cartão branco com sombra */}
      <div className="bg-white shadow-sm rounded-xl p-4 flex items-center border border-slate-100 hover:shadow-md transition-shadow duration-200 relative">
        {/* Bloco da esquerda: Data */}
        <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] text-center shrink-0 pr-3 sm:pr-4">
          <span className="text-sm sm:text-base font-extrabold text-[#000080] tracking-tight leading-tight select-none">
            {date}
          </span>
        </div>

        {/* Divisória vertical */}
        <div className="border-l border-slate-200 self-stretch my-0.5" />

        {/* Bloco central: Horário, Título e Local/Médico */}
        <div className="flex-1 min-w-0 pl-3 sm:pl-4 pr-10">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 mb-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{time}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#000080] truncate tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Canto superior direito: Botão de opções (3 pontos) + Menu Dropdown */}
        <div ref={menuRef} className="absolute top-3 right-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={`Opções para ${title}`}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="p-2 rounded-lg text-slate-400 hover:text-[#000080] hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#126E51]"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleEditClick}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[#000080] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4 text-[#000080]" />
                <span>Editar</span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={handleDeleteClick}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
                <span>Excluir</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
