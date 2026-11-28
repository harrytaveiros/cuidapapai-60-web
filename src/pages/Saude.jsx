import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Utensils,
  User,
  Activity,
  Droplets,
  Check,
  Pencil,
  Trash2,
  X,
  Loader2,
} from 'lucide-react';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import {
  BASE_URL,
  getHeaders,
  getUser,
  getCareTasks,
  logout,
} from '../services/api';

const CATEGORY_CONFIG = {
  blood_pressure: {
    icon: Heart,
    iconBgClass: 'bg-emerald-100',
    iconColorClass: 'text-[#126E51]',
  },
  nutrition: {
    icon: Utensils,
    iconBgClass: 'bg-blue-100',
    iconColorClass: 'text-blue-600',
  },
  mood: {
    icon: User,
    iconBgClass: 'bg-amber-100',
    iconColorClass: 'text-amber-700',
  },
  hydration: {
    icon: Droplets,
    iconBgClass: 'bg-sky-100',
    iconColorClass: 'text-sky-700',
  },
  activity: {
    icon: Activity,
    iconBgClass: 'bg-cyan-100',
    iconColorClass: 'text-cyan-700',
  },
};

function getCategoryStyle(category) {
  return CATEGORY_CONFIG[category] || CATEGORY_CONFIG.activity;
}

/* Tarefa 1: CareTaskCard com botões de ação (Editar/Excluir) à esquerda do checkbox */
export function CareTaskCard({
  icon: Icon,
  iconColorClass,
  iconBgClass,
  title,
  subtitle,
  isCompleted,
  onClick,
  onEdit,
  onDelete,
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
      className="group bg-white rounded-xl shadow-xs p-4 flex items-center gap-3.5 cursor-pointer border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none active:scale-[0.99]"
      aria-pressed={isCompleted}
      aria-label={`${title} - ${isCompleted ? 'Concluído' : 'Pendente'}`}
    >
      {/* Lado esquerdo: Ícone */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass} ${iconColorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Centro: Título e Subtítulo */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#0F172A] text-base truncate tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Ações subtis (Editar / Excluir) à direita do texto e à esquerda do checkbox */}
      <div className="flex items-center gap-1 shrink-0">
        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label={`Editar ${title}`}
            title="Editar"
            className="p-2 rounded-lg text-slate-400 hover:text-[#000080] hover:bg-blue-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#126E51]"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label={`Excluir ${title}`}
            title="Excluir"
            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lado direito: Checkbox de concluir (ação primária) */}
      {isCompleted ? (
        <div
          className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-2xs transition-transform duration-200 scale-105"
          aria-hidden="true"
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      ) : (
        <div
          className="w-7 h-7 rounded-full border-2 border-slate-300 shrink-0 transition-colors duration-200 group-hover:border-[#126E51]"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* Modal reutilizável para Criar ou Editar Meta de Cuidado */
function TaskFormModal({ initialTask, onClose, onSave }) {
  const isEditing = Boolean(initialTask);
  const [title, setTitle] = useState(initialTask?.title || '');
  const [subtitle, setSubtitle] = useState(initialTask?.subtitle || '');
  const [category, setCategory] = useState(initialTask?.category || 'activity');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Por favor, informe o nome da meta.');
      return;
    }

    try {
      setIsLoading(true);
      await onSave({
        title: title.trim(),
        subtitle: subtitle.trim() || 'Toque para registrar',
        category,
        is_completed: initialTask?.isCompleted ?? false,
      });
      onClose();
    } catch (err) {
      setError(err?.message || 'Não foi possível salvar a meta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 antialiased"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-meta-titulo"
      onClick={() => !isLoading && onClose()}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3
              id="modal-meta-titulo"
              className="text-2xl font-extrabold text-[#000080] tracking-tight"
            >
              {isEditing ? 'Editar Meta' : 'Nova Meta de Hoje'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {isEditing
                ? 'Atualize os detalhes deste cuidado diário.'
                : 'Defina um novo cuidado para acompanhar hoje.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#000080] hover:bg-slate-100 cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-semibold"
            >
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-bold text-[#000080] mb-1.5"
            >
              Nome da meta ou cuidado
            </label>
            <input
              id="task-title"
              type="text"
              required
              disabled={isLoading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Pressão arterial"
              className="w-full px-4 py-3 text-base text-[#000080] bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] disabled:bg-slate-50"
            />
          </div>

          <div>
            <label
              htmlFor="task-subtitle"
              className="block text-sm font-bold text-[#000080] mb-1.5"
            >
              Descrição / Observação
            </label>
            <input
              id="task-subtitle"
              type="text"
              disabled={isLoading}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Medir após o café da manhã"
              className="w-full px-4 py-3 text-base text-[#000080] bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] disabled:bg-slate-50"
            />
          </div>

          <div>
            <label
              htmlFor="task-category"
              className="block text-sm font-bold text-[#000080] mb-1.5"
            >
              Categoria
            </label>
            <select
              id="task-category"
              disabled={isLoading}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 text-base text-[#000080] bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] disabled:bg-slate-50"
            >
              <option value="blood_pressure">Pressão arterial / Saúde</option>
              <option value="nutrition">Alimentação</option>
              <option value="hydration">Hidratação</option>
              <option value="mood">Humor e disposição</option>
              <option value="activity">Atividade física</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#126E51] hover:bg-[#0E5941] text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>{isEditing ? 'Salvar Alterações' : 'Salvar Meta'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Saude({ patientName }) {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [error, setError] = useState(null);

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      const data = await getCareTasks();
      const normalized = Array.isArray(data)
        ? data.map((item) => {
            const style = getCategoryStyle(item.category);
            return {
              id: item.id,
              category: item.category || 'activity',
              title: item.title,
              subtitle: item.subtitle || (item.is_completed ? 'Registrado hoje' : 'Toque para registrar'),
              isCompleted: Boolean(item.is_completed),
              icon: style.icon,
              iconBgClass: style.iconBgClass,
              iconColorClass: style.iconColorClass,
            };
          })
        : [];
      setError(null);
      setTasks(normalized);
    } catch (err) {
      if (err.status === 401 || err.message?.includes('401')) {
        logout();
        navigate('/', { replace: true });
        return;
      }
      setError(err.message || 'Não foi possível carregar as metas de cuidado.');
    } finally {
      setIsLoadingTasks(false);
    }
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const data = await getCareTasks();
        if (!isMounted) return;
        const normalized = Array.isArray(data)
          ? data.map((item) => {
              const style = getCategoryStyle(item.category);
              return {
                id: item.id,
                category: item.category || 'activity',
                title: item.title,
                subtitle: item.subtitle || (item.is_completed ? 'Registrado hoje' : 'Toque para registrar'),
                isCompleted: Boolean(item.is_completed),
                icon: style.icon,
                iconBgClass: style.iconBgClass,
                iconColorClass: style.iconColorClass,
              };
            })
          : [];
        setError(null);
        setTasks(normalized);
      } catch (err) {
        if (!isMounted) return;
        if (err.status === 401 || err.message?.includes('401')) {
          logout();
          navigate('/', { replace: true });
          return;
        }
        setError(err.message || 'Não foi possível carregar as metas de cuidado.');
      } finally {
        if (isMounted) setIsLoadingTasks(false);
      }
    }

    init();

    if (!patientName) {
      getUser()
        .then((userData) => {
          if (isMounted && userData) {
            setUserName(userData.short_name || userData.name || '');
          }
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, [navigate, patientName]);

  // Alterna o estado de conclusão da tarefa na API e recarrega a lista
  const toggleTask = async (task) => {
    const nextCompleted = !task.isCompleted;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              isCompleted: nextCompleted,
              subtitle: nextCompleted ? 'Registrado hoje' : 'Toque para registrar',
            }
          : t
      )
    );

    try {
      await fetch(`${BASE_URL}/care-tasks/${task.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          title: task.title,
          subtitle: nextCompleted ? 'Registrado hoje' : 'Toque para registrar',
          category: task.category,
          is_completed: nextCompleted,
        }),
      });
    } catch {
      // Mantém feedback imediato caso offline
    }
  };

  // POST /care-tasks e recarrega a lista real da API
  const handleCreateTask = async (newData) => {
    const response = await fetch(`${BASE_URL}/care-tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(newData),
    });

    if (response.status === 401) {
      logout();
      navigate('/', { replace: true });
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao criar a meta no servidor.');
    }

    await loadTasks();
  };

  // Tarefa 3: PUT /care-tasks/:id e recarrega a lista real da API
  const handleEditTask = async (id, updatedData) => {
    const response = await fetch(`${BASE_URL}/care-tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatedData),
    });

    if (response.status === 401) {
      logout();
      navigate('/', { replace: true });
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao atualizar a meta no servidor.');
    }

    await loadTasks();
  };

  // Tarefa 2: DELETE /care-tasks/:id e recarrega a lista real da API
  const handleDeleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/care-tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.status === 401) {
      logout();
      navigate('/', { replace: true });
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao excluir a meta no servidor.');
    }

    await loadTasks();
    setDeletingTask(null);
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const displayName = patientName || userName || 'o paciente';

  return (
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
              {completedCount} de {totalTasks}
            </span>
            <span className="text-sm sm:text-base text-emerald-100/80 ml-2 font-medium">
              registros preenchidos
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
            {progressPercent}% concluído
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full h-3 bg-[#0a4031] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Botão Outline "Definir metas de hoje" */}
      <button
        type="button"
        onClick={() => setIsGoalModalOpen(true)}
        className="w-full max-w-3xl mx-auto border-2 border-[#126E51] text-[#126E51] bg-white hover:bg-[#126E51]/5 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-8 transition-colors cursor-pointer"
      >
        <Check className="w-5 h-5 stroke-[2.5]" />
        <span>Definir metas de hoje</span>
      </button>

      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold"
        >
          {error}
        </div>
      )}

      {/* Secção de Tarefas */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
          Como {displayName} está?
        </h2>

        {isLoadingTasks ? (
          <div className="py-10 flex flex-col items-center justify-center text-slate-500">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-[#126E51] rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium">Carregando metas de cuidado...</p>
          </div>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <CareTaskCard
                key={task.id}
                icon={task.icon}
                iconColorClass={task.iconColorClass}
                iconBgClass={task.iconBgClass}
                title={task.title}
                subtitle={task.subtitle}
                isCompleted={task.isCompleted}
                onClick={() => toggleTask(task)}
                onEdit={() => setEditingTask(task)}
                onDelete={() => setDeletingTask(task)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-xs text-slate-500">
            Nenhuma meta de cuidado definida para hoje. Clique em &quot;Definir metas de hoje&quot; para adicionar.
          </div>
        )}
      </div>

      {/* Modal para criar nova meta */}
      {isGoalModalOpen && (
        <TaskFormModal
          key="new-task"
          initialTask={null}
          onClose={() => setIsGoalModalOpen(false)}
          onSave={handleCreateTask}
        />
      )}

      {/* Modal para editar meta existente (pré-preenchido) */}
      {editingTask && (
        <TaskFormModal
          key={editingTask.id}
          initialTask={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedData) => handleEditTask(editingTask.id, updatedData)}
        />
      )}

      {/* Modal reutilizado de Confirmação de Exclusão */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingTask)}
        modalTitle="Excluir Meta"
        description={
          deletingTask
            ? `Tem a certeza que deseja excluir a meta '${deletingTask.title}'? Esta ação não pode ser desfeita.`
            : ''
        }
        onClose={() => setDeletingTask(null)}
        onConfirm={() => handleDeleteTask(deletingTask.id)}
      />
    </div>
  );
}
