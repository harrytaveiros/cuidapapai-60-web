import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Heart,
  Save,
  LogOut,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function Perfil() {
  const navigate = useNavigate();

  // Estados de dados do utilizador
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: 'Dona Maria Silva',
    dataNascimento: '1948-05-14',
    telefone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
  });

  const [dadosSaude, setDadosSaude] = useState({
    medicamentos: 'Losartana 50mg (14:00), Metformina 850mg (após almoço), Sinvastatina 20mg (20:00)',
    doencas: 'Hipertensão Arterial, Diabetes Tipo 2',
    alergias: 'Penicilina, Dipirona',
    contatoEmergencia: 'Mariana Costa (Filha) - (11) 99888-7766',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSalvar = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 antialiased pb-6">
      {/* Topo: Avatar circular com iniciais e identificação do utente */}
      <section className="bg-card rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        {/* Avatar circular com iniciais */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#126E51] text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shrink-0 shadow-md border-4 border-white ring-2 ring-emerald-100">
          <span>DM</span>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {dadosPessoais.nome}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#126E51] text-xs font-bold">
              Assistida +50
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Cadastrada sob os cuidados de Mariana Costa (Filha)
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#126E51]" />
            <span>Perfil e dados biométricos verificados</span>
          </div>
        </div>
      </section>

      {/* Alerta de confirmação ao salvar */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#126E51] text-sm font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-5 h-5 text-[#126E51]" />
          <span>Alterações salvas com sucesso no prontuário!</span>
        </div>
      )}

      <form onSubmit={handleSalvar} className="space-y-6">
        {/* Card 1: Meus Dados */}
        <div className="bg-white shadow-xs rounded-xl p-6 border border-slate-100 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-[#126E51]">
            <User className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Meus Dados
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="nome"
                  type="text"
                  value={dadosPessoais.nome}
                  onChange={(e) =>
                    setDadosPessoais({ ...dadosPessoais, nome: e.target.value })
                  }
                  className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="dataNascimento"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Data de Nascimento
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  id="dataNascimento"
                  type="date"
                  value={dadosPessoais.dataNascimento}
                  onChange={(e) =>
                    setDadosPessoais({
                      ...dadosPessoais,
                      dataNascimento: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Telefone de Contato
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="telefone"
                  type="text"
                  value={dadosPessoais.telefone}
                  onChange={(e) =>
                    setDadosPessoais({
                      ...dadosPessoais,
                      telefone: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={dadosPessoais.email}
                  onChange={(e) =>
                    setDadosPessoais({
                      ...dadosPessoais,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-10 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Minha Saúde */}
        <div className="bg-white shadow-xs rounded-xl p-6 border border-slate-100 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-[#126E51]">
            <Heart className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Minha Saúde
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="medicamentos"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Medicamentos Contínuos
              </label>
              <textarea
                id="medicamentos"
                rows={3}
                value={dadosSaude.medicamentos}
                onChange={(e) =>
                  setDadosSaude({ ...dadosSaude, medicamentos: e.target.value })
                }
                className="w-full p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="doencas"
                  className="block text-sm font-bold text-slate-700 mb-1.5"
                >
                  Condições / Doenças Diagnosticadas
                </label>
                <input
                  id="doencas"
                  type="text"
                  value={dadosSaude.doencas}
                  onChange={(e) =>
                    setDadosSaude({ ...dadosSaude, doencas: e.target.value })
                  }
                  className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="contatoEmergencia"
                  className="block text-sm font-bold text-slate-700 mb-1.5"
                >
                  Contato de Emergência
                </label>
                <input
                  id="contatoEmergencia"
                  type="text"
                  value={dadosSaude.contatoEmergencia}
                  onChange={(e) =>
                    setDadosSaude({
                      ...dadosSaude,
                      contatoEmergencia: e.target.value,
                    })
                  }
                  className="w-full h-12 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Secção de Ações: Salvar e Sair */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Botão verde Salvar alterações */}
          <button
            type="submit"
            className="w-full bg-[#126E51] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#0F5C47] transition shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <Save className="w-5 h-5" />
            <span>Salvar alterações</span>
          </button>

          {/* Botão vazado vermelho Sair da conta */}
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair da conta</span>
          </button>
        </div>
      </form>

      {/* Modal de confirmação simples de Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Deseja sair da conta?
              </h3>
            </div>

            <p className="text-sm text-slate-600">
              Você precisará inserir suas credenciais de e-mail e senha novamente para acessar o aplicativo.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition cursor-pointer shadow-xs"
              >
                Confirmar e Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
