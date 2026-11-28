import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Pill,
  Check,
  CalendarPlus,
  Clock,
  ChevronRight,
  Sparkles,
  HeartPulse,
  Droplets,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  getUser,
  getMedications,
  getAppointments,
  getCareTasks,
  logout,
} from '../services/api';

// Formatação inicial de data acolhedora e acessível
function getFormattedToday() {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

// Mapeamento dinâmico de ícones por categoria da API
function getTaskIcon(category) {
  switch (category) {
    case 'blood_pressure':
      return HeartPulse;
    case 'hydration':
      return Droplets;
    case 'medication':
      return Pill;
    case 'appointment':
      return CalendarPlus;
    default:
      return Activity;
  }
}

export default function Home() {
  const navigate = useNavigate();

  // Tarefa 2: Estados da Home
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [medTaken, setMedTaken] = useState(false);
  const [dateDisplay] = useState(getFormattedToday);

  // Tarefa 2 e 3: Carregamento simultâneo com Promise.all e tratamento de 401
  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        const [userData, medicationsData, appointmentsData, tasksData] =
          await Promise.all([
            getUser(),
            getMedications(),
            getAppointments(),
            getCareTasks(),
          ]);

        setUser(userData);
        setMedications(Array.isArray(medicationsData) ? medicationsData : []);
        setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (error) {
        console.error('Falha ao carregar dados do dashboard:', error);
        // Se a chamada falhar com status 401 (Não autorizado), força logout e redireciona para Login
        if (error.status === 401 || error.message?.includes('401')) {
          logout();
          navigate('/', { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [navigate]);

  // Tarefa 3: Estado de Loading com Spinner circular verde e mensagem
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#126E51] rounded-full animate-spin mb-4 shadow-xs" />
        <p className="text-base font-semibold text-slate-700 animate-pulse">
          Carregando a sua rotina...
        </p>
      </div>
    );
  }

  // Próximo medicamento do array
  const nextMed = medications && medications.length > 0 ? medications[0] : null;

  return (
    <div className="w-full space-y-6 antialiased">
      {/* TAREFA 4: Cabeçalho com Saudação "Olá, {user?.short_name}!" */}
      <section className="bg-card rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
              {dateDisplay}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-0.5">
              Olá, {user?.short_name || 'Dona Maria'}!
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

        {/* Linha tricolor decorativa */}
        <div className="flex h-1.5 w-28 rounded-full overflow-hidden mt-4 shadow-2xs">
          <span className="w-1/2 bg-primary"></span>
          <span className="w-1/4 bg-secondary"></span>
          <span className="w-1/4 bg-sky-400"></span>
        </div>
      </section>

      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Coluna 1 (lg:col-span-2): Medicamento e Acesso Rápido */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAREFA 4: Card de Medicamento (Próximo) */}
          {nextMed ? (
            <div className="w-full bg-gradient-to-r from-primary via-[#147e5d] to-[#1ca175] text-white rounded-3xl p-6 shadow-md relative overflow-hidden transition-all duration-300">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-inner shrink-0">
                    <Pill className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold tracking-wide uppercase mb-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Próximo Medicamento • {nextMed.time}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {nextMed.name}
                    </h3>
                    <p className="text-sm text-emerald-50/90 mt-0.5">
                      {nextMed.dosage}{' '}
                      {nextMed.instructions ? `• ${nextMed.instructions}` : ''}
                    </p>
                  </div>
                </div>

                {/* Botão marcar como tomado */}
                <button
                  type="button"
                  onClick={() => setMedTaken(!medTaken)}
                  className={`cursor-pointer whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 self-start sm:self-center ${
                    medTaken || nextMed.is_taken
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-white text-primary hover:bg-slate-50 active:scale-95'
                  }`}
                  aria-label="Marcar medicamento como tomado"
                >
                  <Check
                    className={`w-4 h-4 transition-transform ${
                      medTaken || nextMed.is_taken ? 'scale-125 stroke-[3]' : 'stroke-2'
                    }`}
                  />
                  <span>
                    {medTaken || nextMed.is_taken
                      ? 'Dose tomada!'
                      : 'Marcar como tomado'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Mensagem se medications estiver vazio */
            <div className="w-full bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 text-[#126E51] shadow-xs flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-[#126E51] shadow-xs shrink-0">
                <CheckCircle2 className="w-7 h-7 text-[#126E51]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Tudo certo! Sem medicamentos pendentes.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Todas as doses programadas para hoje já foram concluídas.
                </p>
              </div>
            </div>
          )}

          {/* TAREFA 4: Acesso Rápido (.map em tasks) */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Acesso rápido
            </h2>

            {tasks && tasks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tasks.map((task) => {
                  const IconComponent = getTaskIcon(task.category);
                  const color = task.color_hex || '#126E51';

                  return (
                    <Link
                      key={task.id}
                      to="/saude"
                      className="bg-card rounded-2xl p-4 shadow-xs border border-slate-100 border-l-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
                      style={{ borderLeftColor: color }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                          style={{
                            backgroundColor: `${color}18`,
                            color: color,
                          }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-primary transition-colors">
                            {task.title}
                          </h4>
                          {task.is_completed && (
                            <span className="text-[10px] bg-emerald-100 text-[#126E51] px-1.5 py-0.5 rounded-full font-bold">
                              Feito
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {task.subtitle}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500 bg-card rounded-2xl p-4 border border-slate-100">
                Nenhuma tarefa pendente no momento.
              </p>
            )}
          </div>
        </div>

        {/* Coluna 2 (lg:col-span-1): TAREFA 4 - Compromissos (.map em appointments) */}
        <div className="lg:col-span-1 space-y-3 h-full flex flex-col">
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

          {/* Card alto da agenda */}
          <div className="bg-card rounded-3xl p-5 shadow-xs border border-slate-100 flex-1 flex flex-col justify-between space-y-4">
            {appointments && appointments.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {appointments.map((apt, idx) => (
                  <div
                    key={apt.id || idx}
                    className={`flex items-start gap-3.5 ${
                      idx === 0
                        ? 'pb-4'
                        : idx === appointments.length - 1
                          ? 'pt-4'
                          : 'py-4'
                    }`}
                  >
                    {/* Bloco lateral com day_number e day_of_week_short */}
                    <div
                      className="bg-sky-100 text-sky-800 rounded-2xl w-14 h-14 flex flex-col items-center justify-center shrink-0 shadow-2xs"
                      style={
                        apt.color_hex && apt.color_hex !== '#000080'
                          ? { backgroundColor: `${apt.color_hex}18`, color: apt.color_hex }
                          : undefined
                      }
                    >
                      <span className="text-lg font-extrabold leading-none tracking-tight">
                        {apt.day_number}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mt-0.5">
                        {apt.day_of_week_short}
                      </span>
                    </div>

                    {/* Informações: time, title e médico/subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                          {apt.title}
                        </h4>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                          {apt.time}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-0.5 truncate">
                        {apt.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Mensagem se appointments estiver vazio */
              <div className="py-8 text-center text-slate-500 text-sm">
                Nenhum compromisso agendado para os próximos dias.
              </div>
            )}

            {/* Ação auxiliar no rodapé */}
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
