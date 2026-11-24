import { Clock } from 'lucide-react';

export default function TimelineEvent({
  date,
  time,
  title,
  subtitle,
  colorClass = 'bg-blue-600',
}) {
  return (
    /* Tarefa 2: Container pai simulando a linha do tempo vertical */
    <div className="border-l-2 border-slate-200 ml-4 pl-8 relative pb-6 last:pb-2">
      {/* Tarefa 3: Ponto da linha do tempo absoluto com colorClass */}
      <span
        className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-white shadow-xs ${colorClass}`}
        aria-hidden="true"
      />

      {/* Tarefa 4: Card do evento com bloco da esquerda (data), divisória e bloco da direita */}
      <div className="bg-white shadow-xs rounded-xl p-4 flex items-center border border-slate-100 hover:shadow-md transition-shadow duration-200">
        {/* Bloco da esquerda: data centralizada em azul marinho */}
        <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] text-center shrink-0 pr-3 sm:pr-4">
          <span className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight leading-tight select-none">
            {date}
          </span>
        </div>

        {/* Divisória vertical */}
        <div className="border-l border-slate-200 self-stretch my-0.5" />

        {/* Bloco da direita: time, title e subtitle */}
        <div className="flex-1 min-w-0 pl-3 sm:pl-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{time}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 truncate tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
