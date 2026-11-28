import { useState, useEffect } from 'react';
import { Trash2, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmationModal({
  isOpen,
  appointmentTitle,
  modalTitle = 'Excluir Compromisso',
  description,
  onClose,
  onConfirm,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await onConfirm?.();
      onClose();
    } catch (err) {
      setError(err?.message || 'Não foi possível excluir o compromisso. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 antialiased"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-excluir-compromisso-titulo"
      onClick={() => !isLoading && onClose()}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <h2
              id="modal-excluir-compromisso-titulo"
              className="text-xl sm:text-2xl font-extrabold text-red-600 tracking-tight"
            >
              {modalTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Fechar janela"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Texto de confirmação */}
        <p className="text-base text-slate-700 leading-relaxed">
          {description || (
            <>
              Tem a certeza que deseja excluir o compromisso{' '}
              <strong className="text-[#000080]">&apos;{appointmentTitle}&apos;</strong>? Esta ação não pode ser desfeita.
            </>
          )}
        </p>

        {error && (
          <div
            role="alert"
            className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-semibold"
          >
            {error}
          </div>
        )}

        {/* Botões lado a lado */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 sm:flex-none px-5 py-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmClick}
            disabled={isLoading}
            className="flex-1 sm:flex-none px-5 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Excluindo...</span>
              </>
            ) : (
              <span>Sim, Excluir</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
