import { Users, User, Phone, Plus } from 'lucide-react';

/* Tarefa 1: Componente interno ContactCard */
export function ContactCard({
  name,
  role,
  initials,
  avatarColorClass = 'bg-slate-700',
  isProfessional = false,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
      {/* Esquerda: Avatar */}
      {isProfessional ? (
        <div
          className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs"
          aria-label="Avatar profissional"
        >
          <User className="w-6 h-6" />
        </div>
      ) : (
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm tracking-wide shrink-0 shadow-2xs ${avatarColorClass}`}
          aria-label={`Iniciais de ${name}`}
        >
          <span>{initials}</span>
        </div>
      )}

      {/* Centro: Nome, cargo e badge se profissional */}
      <div className="flex-1 ml-4 min-w-0">
        {isProfessional && (
          <span className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider block mb-0.5">
            DISPONÍVEL HOJE
          </span>
        )}
        <h3 className="font-bold text-[#0F172A] text-base truncate tracking-tight">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
          {role}
        </p>
      </div>

      {/* Direita: Botão redondo verde claro com ícone de telefone verde escuro */}
      <button
        type="button"
        aria-label={`Ligar para ${name}`}
        title={`Ligar para ${name}`}
        className="w-11 h-11 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#126E51] flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3 shadow-2xs active:scale-95"
      >
        <Phone className="w-5 h-5 fill-current" />
      </button>
    </div>
  );
}

export default function Cuidadores() {
  return (
    /* Tarefa 2: Layout Principal com max-w-5xl mx-auto */
    <div className="max-w-5xl mx-auto w-full space-y-6">
      {/* Cabeçalho existente com ícone e título */}
      <div className="bg-card rounded-2xl p-5 shadow-xs border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Equipe de Cuidadores
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Familiares e profissionais de saúde com acesso autorizado.
            </p>
          </div>
        </div>
      </div>

      {/* Banner Amarelo de Acolhimento com borda lateral esquerda grossa em azul escuro */}
      <div className="bg-amber-50/90 border border-amber-200/60 border-l-4 border-l-[#0F172A] rounded-xl p-4 sm:p-5 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
          Você não está sozinho
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          Sua rede recebe as atualizações importantes.
        </p>
      </div>

      {/* Tarefa 3: Layout de 2 colunas abaixo do banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-start">
        {/* Coluna 1: Familiares */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Familiares
          </h2>
          <div className="space-y-3.5">
            <ContactCard
              name="Mariana Costa"
              role="Filha · Administradora"
              initials="MC"
              avatarColorClass="bg-emerald-700"
            />
            <ContactCard
              name="João Pedro"
              role="Neto · Acompanhante"
              initials="JP"
              avatarColorClass="bg-blue-700"
            />
          </div>
        </section>

        {/* Coluna 2: Cuidadora responsável */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Cuidadora responsável
          </h2>
          <div className="space-y-3.5">
            <ContactCard
              name="Ana Paula"
              role="Cuidadora profissional · 4,9"
              isProfessional={true}
            />

            {/* Botão "+ Encontrar outro cuidador" */}
            <button
              type="button"
              className="w-full mt-4 py-3 px-4 border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span> Encontrar outro cuidador</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
