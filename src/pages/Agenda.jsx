import { Calendar, Plus } from 'lucide-react';
import TimelineEvent from '../components/TimelineEvent';

export default function Agenda() {
  return (
    /* Tarefa 5: Container centralizado que não estica infinitamente */
    <div className="max-w-4xl mx-auto w-full">
      {/* Tarefa 6: Cabeçalho com Flexbox */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        {/* Lado esquerdo: Card/título atual "Agenda de Cuidados" */}
        <div className="bg-card rounded-2xl p-5 shadow-xs border border-slate-100 flex-1 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Agenda de Cuidados
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Compromissos médicos, visitas e rotina diária cadastrados.
              </p>
            </div>
          </div>
        </div>

        {/* Lado direito: Botão "+ Novo compromisso" */}
        <button
          type="button"
          className="bg-[#126E51] text-white px-6 py-3 rounded-xl hover:bg-[#0F5C47] transition-colors font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0 self-stretch md:self-auto active:scale-98"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span> Novo compromisso</span>
        </button>
      </div>

      {/* Tarefa 7: Título "Esta semana" (azul marinho escuro, negrito, mb-6) */}
      <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-6 tracking-tight">
        Esta semana
      </h2>

      {/* Tarefa 8: Três TimelineEvents simulando os dados do app */}
      <div className="space-y-0">
        <TimelineEvent
          date="14 MAI"
          time="10:30"
          title="Cardiologista"
          subtitle="Clínica São Lucas"
          colorClass="bg-blue-600"
        />

        <TimelineEvent
          date="16 MAI"
          time="15:00"
          title="Fisioterapia"
          subtitle="Atendimento em casa"
          colorClass="bg-yellow-500"
        />

        <TimelineEvent
          date="17 MAI"
          time="12:00"
          title="Almoço em família"
          subtitle="Casa da Juliana"
          colorClass="bg-[#126E51]"
        />
      </div>
    </div>
  );
}
