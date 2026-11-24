import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  Check,
  CalendarPlus,
  Bell,
  HeartPulse,
  UserSearch,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

// Formatação inicial de data acolhedora e acessível (fora da renderização pura)
function getFormattedToday() {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default function Home() {
  const [medTaken, setMedTaken] = useState(false);
  const [dateDisplay] = useState(getFormattedToday);

  // Dados dos 4 cartões de Acesso Rápido
  const quickActions = [
    {
      id: 'consulta',
      title: 'Nova consulta',
      subtitle: 'Agendar com médico',
      icon: CalendarPlus,
      borderColor: 'border-l-sky-500',
      iconBg: 'bg-sky-50 text-sky-600',
      to: '/agenda',
    },
    {
      id: 'lembrete',
      title: 'Lembrete',
      subtitle: 'Criar novo alarme',
      icon: Bell,
      borderColor: 'border-l-secondary',
      iconBg: 'bg-amber-50 text-amber-600',
      to: '/agenda',
    },
    {
      id: 'cuidado',
      title: 'Registrar cuidado',
      subtitle: 'Pressão, glicose e mais',
      icon: HeartPulse,
      borderColor: 'border-l-primary',
      iconBg: 'bg-emerald-50 text-primary',
      to: '/saude',
    },
    {
      id: 'cuidador',
      title: 'Buscar cuidador',
      subtitle: 'Equipe e apoios',
      icon: UserSearch,
      borderColor: 'border-l-purple-500',
      iconBg: 'bg-purple-50 text-purple-600',
      to: '/cuidadores',
    },
  ];

  // Dados dos 3 próximos eventos da agenda
  const upcomingEvents = [
    {
      id: 1,
      day: '14',
      month: 'MAI',
      title: 'Consulta Cardiologista',
      doctor: 'Dr. Roberto Silva',
      time: '09:30',
      location: 'Hospital Santa Lúcia',
      type: 'Presencial',
    },
    {
      id: 2,
      day: '18',
      month: 'MAI',
      title: 'Sessão de Fisioterapia',
      doctor: 'Dra. Camila Soares',
      time: '14:00',
      location: 'Atendimento Domiciliar',
      type: 'Domiciliar',
    },
    {
      id: 3,
      day: '22',
      month: 'MAI',
      title: 'Exame de Sangue & Glicemia',
      doctor: 'Laboratório Central',
      time: '07:30',
      location: 'Jejum obrigatório de 8h',
      type: 'Exame',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* TAREFA 1: Cabeçalho de Saudação + Linha Tricolor */}
      <section className="bg-card rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
              {dateDisplay}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-0.5">
              Olá, Dona Maria!
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal mt-1">
              Veja como está o seu dia.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 self-start bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Tudo tranquilo hoje</span>
          </div>
        </div>

        {/* Linha tricolor decorativa (Verde primary, Amarelo secondary e Azul de suporte) */}
        <div className="flex h-1.5 w-28 rounded-full overflow-hidden mt-4 shadow-2xs">
          <span className="w-1/2 bg-primary"></span>
          <span className="w-1/4 bg-secondary"></span>
          <span className="w-1/4 bg-sky-400"></span>
        </div>
      </section>

      {/* TAREFA 2: Container com CSS Grid Responsivo (1 col no mobile, 3 cols no desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* TAREFA 3: Coluna 1 (lg:col-span-2) contendo Secção A e Secção B */}
        <div className="lg:col-span-2 space-y-6">
          {/* Secção A: Card "Próximo Medicamento" com degradê verde */}
          <div className="w-full bg-gradient-to-r from-primary via-[#147e5d] to-[#1ca175] text-white rounded-3xl p-6 shadow-md relative overflow-hidden transition-all duration-300">
            {/* Decoração sutil de fundo */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-inner shrink-0">
                  <Pill className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold tracking-wide uppercase mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Próximo Medicamento • 14:00</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Losartana Potássica
                  </h3>
                  <p className="text-sm text-emerald-50/90 mt-0.5">
                    50mg • 1 comprimido com água após o almoço
                  </p>
                </div>
              </div>

              {/* Botão branco interativo */}
              <button
                type="button"
                onClick={() => setMedTaken(!medTaken)}
                className={`cursor-pointer whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 self-start sm:self-center ${
                  medTaken
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-white text-primary hover:bg-slate-50 active:scale-95'
                }`}
                aria-label="Marcar medicamento como tomado"
              >
                <Check
                  className={`w-4 h-4 transition-transform ${
                    medTaken ? 'scale-125 stroke-[3]' : 'stroke-2'
                  }`}
                />
                <span>{medTaken ? 'Dose tomada!' : 'Marcar como tomado'}</span>
              </button>
            </div>
          </div>

          {/* Secção B: "Acesso rápido" com grid de 4 cartões com bordas laterais */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Acesso rápido
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Link
                    key={action.id}
                    to={action.to}
                    className={`bg-card rounded-2xl p-4 shadow-xs border border-slate-100 border-l-4 ${action.borderColor} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {action.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* TAREFA 4: Coluna 2 (lg:col-span-1) - Próximos compromissos */}
        <div className="lg:col-span-1 space-y-3 h-full flex flex-col">
          {/* Cabeçalho da coluna */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Próximos compromissos
            </h2>
            <Link
              to="/agenda"
              className="text-xs sm:text-sm font-semibold text-primary hover:text-emerald-700 transition-colors flex items-center gap-0.5 group"
            >
              <span>Ver agenda</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Card alto contendo a lista dos próximos 3 eventos */}
          <div className="bg-card rounded-3xl p-5 shadow-xs border border-slate-100 flex-1 flex flex-col justify-between space-y-4">
            <div className="divide-y divide-slate-100">
              {upcomingEvents.map((event, idx) => (
                <div
                  key={event.id}
                  className={`flex items-start gap-3.5 ${
                    idx === 0 ? 'pb-4' : idx === upcomingEvents.length - 1 ? 'pt-4' : 'py-4'
                  }`}
                >
                  {/* Bloco lateral azul claro com o dia e mês */}
                  <div className="bg-sky-100 text-sky-800 rounded-2xl w-14 h-14 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-lg font-extrabold leading-none tracking-tight">
                      {event.day}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mt-0.5">
                      {event.month}
                    </span>
                  </div>

                  {/* Informações do compromisso */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {event.title}
                      </h4>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 mt-0.5 truncate">
                      {event.doctor}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                      <span className="text-[11px] text-slate-500 truncate">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé auxiliar do card da agenda para preenchimento harmônico */}
            <div className="pt-2">
              <Link
                to="/agenda"
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200/60"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-primary" />
                <span>Agendar novo compromisso</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
