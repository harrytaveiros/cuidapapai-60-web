import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';
import AddAppointmentModal from '../components/AddAppointmentModal';
import EditAppointmentModal from '../components/EditAppointmentModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import {
  BASE_URL,
  getHeaders,
  getAppointments,
  logout,
} from '../services/api';

const MONTHS_PT = [
  'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
  'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ',
];

function extractIsoDate(dateStr) {
  if (!dateStr) return '';
  return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
}

function formatDateBadge(isoDate, fallbackDay, fallbackWeekDay) {
  if (isoDate && isoDate.includes('-')) {
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const monthIdx = Number(parts[1]) - 1;
      const day = parts[2].padStart(2, '0');
      return `${day} ${MONTHS_PT[monthIdx] || ''}`.trim();
    }
  }
  if (fallbackDay && fallbackWeekDay) {
    return `${fallbackDay} ${fallbackWeekDay}`;
  }
  return isoDate || '';
}

function normalizeAppointment(item) {
  const isoDate = extractIsoDate(item.date);
  return {
    id: item.id,
    isoDate,
    date: formatDateBadge(isoDate, item.day_number, item.day_of_week_short),
    time: item.time || '',
    title: item.title || '',
    subtitle: item.subtitle || item.location || '',
    colorClass:
      item.color_hex === '#126E51'
        ? 'bg-[#126E51]'
        : item.color_hex === '#FBBF24'
          ? 'bg-yellow-500'
          : 'bg-blue-600',
  };
}

export default function Agenda() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  // Carrega os compromissos reais do back-end ao montar o componente
  useEffect(() => {
    async function loadAppointments() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAppointments();
        const list = Array.isArray(data) ? data.map(normalizeAppointment) : [];
        setAppointments(list);
      } catch (err) {
        if (err.status === 401 || err.message?.includes('401')) {
          logout();
          navigate('/', { replace: true });
          return;
        }
        setError(err.message || 'Não foi possível carregar os compromissos.');
      } finally {
        setIsLoading(false);
      }
    }

    loadAppointments();
  }, [navigate]);

  // POST /appointments — persiste no back-end antes de atualizar o state
  const handleCreateSave = async (formData) => {
    const payload = {
      title: formData.title,
      date: `${formData.date}T${formData.time}Z`,
      time: formData.time,
      subtitle: formData.location,
      color_hex: '#126E51',
    };

    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      logout();
      navigate('/', { replace: true });
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao criar o compromisso no servidor.');
    }

    const created = await response.json();
    const normalized = normalizeAppointment({
      ...payload,
      ...created,
    });

    setAppointments((prev) => [normalized, ...prev]);
  };

  // PUT /appointments/:id — persiste a edição no back-end antes de atualizar o state
  const handleEditSave = async (id, formData) => {
    const payload = {
      title: formData.title,
      date: `${formData.date}T${formData.time}Z`,
      time: formData.time,
      subtitle: formData.location,
    };

    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      logout();
      navigate('/', { replace: true });
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao atualizar o compromisso no servidor.');
    }

    const updatedFromApi = await response.json().catch(() => null);
    const updatedItem = normalizeAppointment({
      id,
      ...payload,
      ...(updatedFromApi || {}),
    });

    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  // DELETE /appointments/:id — exclui no back-end antes de remover do state
  const handleDelete = async (id) => {
    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
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
      throw new Error(errorData.message || 'Erro ao excluir o compromisso no servidor.');
    }

    setAppointments((prev) => prev.filter((item) => item.id !== id));
    setDeletingAppointment(null);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Cabeçalho com Flexbox */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#126E51] text-white px-6 py-3 rounded-xl hover:bg-[#0F5C47] transition-colors font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0 self-stretch md:self-auto active:scale-98"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Novo compromisso</span>
        </button>
      </div>

      {/* Título da secção */}
      <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-6 tracking-tight">
        Próximos compromissos
      </h2>

      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold"
        >
          {error}
        </div>
      )}

      {/* Lista de Cartões de Compromisso */}
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500">
          <div className="w-10 h-10 border-4 border-emerald-100 border-t-[#126E51] rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium">Carregando compromissos...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-0">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              date={appointment.date}
              time={appointment.time}
              title={appointment.title}
              subtitle={appointment.subtitle}
              colorClass={appointment.colorClass}
              onEdit={() => setEditingAppointment(appointment)}
              onDelete={() => setDeletingAppointment(appointment)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-xs text-slate-500">
          Nenhum compromisso agendado para os próximos dias.
        </div>
      )}

      {/* Modal de Criação */}
      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreateSave}
      />

      {/* Modal de Edição */}
      <EditAppointmentModal
        isOpen={Boolean(editingAppointment)}
        appointment={editingAppointment}
        onClose={() => setEditingAppointment(null)}
        onSave={handleEditSave}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingAppointment)}
        appointmentTitle={deletingAppointment?.title || ''}
        onClose={() => setDeletingAppointment(null)}
        onConfirm={() => handleDelete(deletingAppointment.id)}
      />
    </div>
  );
}
