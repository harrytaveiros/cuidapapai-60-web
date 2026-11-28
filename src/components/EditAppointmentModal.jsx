import { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

function EditAppointmentForm({ appointment, onClose, onSave }) {
  const [title, setTitle] = useState(appointment.title || '');
  const [date, setDate] = useState(appointment.isoDate || '');
  const [time, setTime] = useState(appointment.time || '');
  const [location, setLocation] = useState(appointment.subtitle || appointment.location || '');
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

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !date || !time || !location.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setIsLoading(true);
      await onSave?.(appointment.id, {
        title: title.trim(),
        date,
        time,
        location: location.trim(),
      });
      onClose();
    } catch (err) {
      setError(err?.message || 'Não foi possível atualizar o compromisso. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 antialiased"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-editar-consulta-titulo"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2
              id="modal-editar-consulta-titulo"
              className="text-2xl font-extrabold text-[#000080] tracking-tight"
            >
              Editar Consulta
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Atualize as informações do compromisso.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            aria-label="Fechar janela"
            className="p-2 rounded-lg text-slate-500 hover:text-[#000080] hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#126E51] disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Corpo do Formulário em Grelha (Grid) */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-semibold"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Linha 1: Largura total */}
            <div className="md:col-span-2">
              <label
                htmlFor="edit-appointment-title"
                className="block text-base font-bold text-[#000080] mb-2"
              >
                Título da consulta
              </label>
              <input
                id="edit-appointment-title"
                type="text"
                required
                disabled={isLoading}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Consulta com Cardiologista"
                className="w-full px-4 py-3 text-base text-[#000080] placeholder:text-slate-400 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] transition-all disabled:bg-slate-50 disabled:opacity-70"
              />
            </div>

            {/* Linha 2 (Esquerda): Data */}
            <div>
              <label
                htmlFor="edit-appointment-date"
                className="block text-base font-bold text-[#000080] mb-2"
              >
                Data
              </label>
              <input
                id="edit-appointment-date"
                type="date"
                required
                disabled={isLoading}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 text-base text-[#000080] bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] transition-all disabled:bg-slate-50 disabled:opacity-70"
              />
            </div>

            {/* Linha 2 (Direita): Horário */}
            <div>
              <label
                htmlFor="edit-appointment-time"
                className="block text-base font-bold text-[#000080] mb-2"
              >
                Horário
              </label>
              <input
                id="edit-appointment-time"
                type="time"
                required
                disabled={isLoading}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 text-base text-[#000080] bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] transition-all disabled:bg-slate-50 disabled:opacity-70"
              />
            </div>

            {/* Linha 3: Largura total */}
            <div className="md:col-span-2">
              <label
                htmlFor="edit-appointment-location"
                className="block text-base font-bold text-[#000080] mb-2"
              >
                Local ou Médico
              </label>
              <input
                id="edit-appointment-location"
                type="text"
                required
                disabled={isLoading}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Clínica São Lucas - Dr. Roberto"
                className="w-full px-4 py-3 text-base text-[#000080] placeholder:text-slate-400 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126E51] focus:border-[#126E51] transition-all disabled:bg-slate-50 disabled:opacity-70"
              />
            </div>
          </div>

          {/* Rodapé do Modal */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-[#126E51] hover:bg-[#0E5941] text-white font-bold text-lg rounded-md shadow-xs transition-colors flex items-center justify-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#126E51] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Salvar Compromisso</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditAppointmentModal({
  isOpen,
  appointment,
  onClose,
  onSave,
}) {
  if (!isOpen || !appointment) return null;

  return (
    <EditAppointmentForm
      key={appointment.id}
      appointment={appointment}
      onClose={onClose}
      onSave={onSave}
    />
  );
}
