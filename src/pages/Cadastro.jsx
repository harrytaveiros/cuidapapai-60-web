import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, HeartHandshake, Activity } from 'lucide-react';

export default function Cadastro() {
  const navigate = useNavigate();

  // Estados dos formulários
  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    email: '',
    senha: '',
    nomeIdoso: '',
    dataNascimentoIdoso: '',
    parentesco: 'Filho(a)',
    medicamentos: '',
  });

  // Estado das doenças crônicas
  const [doencas, setDoencas] = useState({
    hipertensao: true,
    diabetes: false,
    cardiopatia: false,
    alzheimer: false,
    artrose: false,
    osteoporose: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (key) => {
    setDoencas((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ação: Concluir cadastro e entrar diretamente no Dashboard
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 flex items-center justify-center antialiased">
      {/* Card branco grande, centralizado e espaçoso */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 shadow-xs rounded-2xl bg-white border border-slate-100 w-full space-y-8">
        {/* Cabeçalho com botão de Voltar e título */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#126E51] hover:text-[#0F5C47] transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar para o Login</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#126E51] tracking-tight">
                Nova Conta
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Cadastre o cuidador e a pessoa assistida para iniciar o acompanhamento.
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">
              CuidaPapai+50
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECÇÃO 1: Dados de Acesso */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-[#126E51]">
              <Lock className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">
                1. Dados de Acesso do Responsável
              </h2>
            </div>

            <div>
              <label
                htmlFor="nomeResponsavel"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Nome Completo do Responsável
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  type="text"
                  required
                  value={formData.nomeResponsavel}
                  onChange={handleChange}
                  placeholder="Ex: Mariana Costa Silva"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-700 mb-1.5"
                >
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seuemail@exemplo.com"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-bold text-slate-700 mb-1.5"
                >
                  Senha de Acesso
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Mínimo de 6 caracteres"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECÇÃO 2: Perfil do Idoso */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-[#126E51]">
              <HeartHandshake className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">
                2. Perfil da Pessoa Assistida (+50)
              </h2>
            </div>

            <div>
              <label
                htmlFor="nomeIdoso"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Nome Completo do Assistido(a)
              </label>
              <input
                id="nomeIdoso"
                name="nomeIdoso"
                type="text"
                required
                value={formData.nomeIdoso}
                onChange={handleChange}
                placeholder="Ex: Dona Maria Silva"
                className="w-full h-14 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dataNascimentoIdoso"
                  className="block text-sm font-bold text-slate-700 mb-1.5"
                >
                  Data de Nascimento
                </label>
                <input
                  id="dataNascimentoIdoso"
                  name="dataNascimentoIdoso"
                  type="date"
                  required
                  value={formData.dataNascimentoIdoso}
                  onChange={handleChange}
                  className="w-full h-14 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="parentesco"
                  className="block text-sm font-bold text-slate-700 mb-1.5"
                >
                  Grau de Parentesco / Relação
                </label>
                <select
                  id="parentesco"
                  name="parentesco"
                  value={formData.parentesco}
                  onChange={handleChange}
                  className="w-full h-14 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all"
                >
                  <option value="Filho(a)">Filho(a)</option>
                  <option value="Neto(a)">Neto(a)</option>
                  <option value="Cônjuge">Cônjuge</option>
                  <option value="Cuidador(a) Profissional">Cuidador(a) Profissional</option>
                  <option value="Irmão/Irmã">Irmão/Irmã</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </section>

          {/* SECÇÃO 3: Ficha Médica */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-[#126E51]">
              <Activity className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-800">
                3. Ficha Médica e Cuidados
              </h2>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Condições e Doenças Crônicas Diagnosticadas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'hipertensao', label: 'Hipertensão Arterial' },
                  { key: 'diabetes', label: 'Diabetes' },
                  { key: 'cardiopatia', label: 'Problemas Cardíacos' },
                  { key: 'alzheimer', label: 'Alzheimer / Demência' },
                  { key: 'artrose', label: 'Artrite ou Artrose' },
                  { key: 'osteoporose', label: 'Osteoporose' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                      doencas[item.key]
                        ? 'bg-emerald-50/80 border-[#126E51] text-[#126E51] font-semibold'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={doencas[item.key]}
                      onChange={() => handleCheckboxChange(item.key)}
                      className="w-5 h-5 rounded text-[#126E51] focus:ring-[#126E51] border-slate-300"
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="medicamentos"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Medicamentos Contínuos e Observações
              </label>
              <textarea
                id="medicamentos"
                name="medicamentos"
                rows={3}
                value={formData.medicamentos}
                onChange={handleChange}
                placeholder="Ex: Losartana 50mg (1x ao dia às 14h), Metformina 850mg após o almoço..."
                className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all resize-none"
              />
            </div>
          </section>

          {/* Call to Action Final */}
          <button
            type="submit"
            className="w-full h-14 bg-[#126E51] hover:bg-[#0F5C47] text-white font-bold text-base rounded-xl shadow-xs transition-colors duration-200 cursor-pointer flex items-center justify-center active:scale-[0.99] mt-6"
          >
            Concluir cadastro e Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
