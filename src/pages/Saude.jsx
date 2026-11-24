import { useState } from 'react';
import { Heart, Utensils, User, Activity, Check } from 'lucide-react';

/* Tarefa 1: Componente CareTaskCard */
export function CareTaskCard({
  icon: Icon,
  iconColorClass,
  iconBgClass,
  title,
  subtitle,
  isCompleted,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="bg-white rounded-xl shadow-xs p-4 flex items-center gap-4 cursor-pointer border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none active:scale-[0.99]"
      aria-pressed={isCompleted}
      aria-label={`${title} - ${isCompleted ? 'Concluído' : 'Pendente'}`}
    >
      {/* Lado esquerdo: Ícone centralizado dentro de quadrado com bordas arredondadas */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass} ${iconColorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Centro: Título (negrito, azul marinho) e Subtítulo (texto pequeno, cinza) */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#0F172A] text-base truncate tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Lado direito: Círculo verde com Check branco ou círculo vazio */}
      {isCompleted ? (
        <div
          className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-2xs transition-transform duration-200 scale-105"
          aria-hidden="true"
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      ) : (
        <div
          className="w-7 h-7 rounded-full border-2 border-slate-300 shrink-0 transition-colors duration-200"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function Saude() {
  /* Tarefa 2: Estado inicial gerenciado por useState */
  const [tasks, setTasks] = useState([
    {
      title: 'Pressão arterial',
      icon: Heart,
      iconBgClass: 'bg-emerald-100',
      iconColorClass: 'text-[#126E51]',
      isCompleted: true,
      activeSubtitle: 'Registrado hoje',
      inactiveSubtitle: 'Toque para registrar',
    },
    {
      title: 'Alimentação',
      icon: Utensils,
      iconBgClass: 'bg-blue-100',
      iconColorClass: 'text-blue-600',
      isCompleted: false,
      activeSubtitle: 'Registrado hoje',
      inactiveSubtitle: 'Toque para registrar',
    },
    {
      title: 'Humor e disposição',
      icon: User,
      iconBgClass: 'bg-amber-100',
      iconColorClass: 'text-amber-700',
      isCompleted: false,
      activeSubtitle: 'Registrado hoje',
      inactiveSubtitle: 'Toque para registrar',
    },
    {
      title: 'Atividade física',
      icon: Activity,
      iconBgClass: 'bg-cyan-100',
      iconColorClass: 'text-cyan-700',
      isCompleted: false,
      activeSubtitle: 'Registrado hoje',
      inactiveSubtitle: 'Toque para registrar',
    },
  ]);

  /* Tarefa 3: Função toggleTask(index) e cálculo dinâmico de completedCount */
  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    /* Tarefa 4: Layout Principal com max-w-4xl mx-auto */
    <div className="max-w-4xl mx-auto w-full space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3.5 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center shrink-0 shadow-2xs">
          <Heart className="w-6 h-6 fill-primary/20 text-primary" />
        </div>
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider block">
            ACOMPANHAMENTO
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Cuidados de hoje
          </h1>
        </div>
      </div>

      {/* Card de Progresso */}
      <div className="w-full bg-gradient-to-r from-[#0F5C47] to-[#126E51] rounded-2xl sm:rounded-3xl p-6 text-white shadow-md">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {completedCount} de 4
            </span>
            <span className="text-sm sm:text-base text-emerald-100/80 ml-2 font-medium">
              registros preenchidos
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
            {Math.round((completedCount / 4) * 100)}% concluído
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full h-3 bg-[#0a4031] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(completedCount / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Secção de Tarefas */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
          Como Dona Maria está?
        </h2>

        {/* Grid para os cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <CareTaskCard
              key={task.title}
              icon={task.icon}
              iconColorClass={task.iconColorClass}
              iconBgClass={task.iconBgClass}
              title={task.title}
              subtitle={
                task.isCompleted
                  ? task.activeSubtitle
                  : task.inactiveSubtitle
              }
              isCompleted={task.isCompleted}
              onClick={() => toggleTask(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
