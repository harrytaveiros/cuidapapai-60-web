import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { login } from '../services/api';

const CURRENT_YEAR = new Date().getFullYear();

export default function Login() {
  const navigate = useNavigate();

  // Tarefa 2: Estados para inputs funcionais, loading e erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Tarefa 2: Função handleLogin com fluxo completo de autenticação
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      // Se sucesso, navegar para a rota "/home"
      navigate('/home');
    } catch (err) {
      // Se erro, exibir a mensagem no alerta vermelho
      setError(err.message || 'E-mail ou senha inválidos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white antialiased">
      {/* Lado Esquerdo: Banner Visual (Oculto em telas mobile < md) */}
      <section className="hidden md:flex md:w-1/2 lg:w-5/12 xl:w-1/2 bg-[#126E51] text-white flex-col justify-between p-8 lg:p-14 relative overflow-hidden select-none">
        {/* Elementos decorativos em degradê suave no fundo */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        {/* Topo do Banner: Selo sutil */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            Plataforma Segura +50
          </span>
        </div>

        {/* Centro do Banner: Logo, Nome da Marca e Mensagem */}
        <div className="relative z-10 my-auto py-12 max-w-md">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner">
              {/* Ícone de coração amarelo */}
              <Heart className="w-8 h-8 text-[#FBBF24] fill-[#FBBF24]" />
            </div>
            {/* Texto "CuidaPapai+50" em branco e amarelo */}
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              <span className="text-white">CuidaPapai</span>
              <span className="text-[#FBBF24] font-black">+50</span>
            </h1>
          </div>

          {/* Mensagem de acolhimento */}
          <p className="text-lg lg:text-xl text-emerald-50/95 font-medium leading-relaxed">
            Cuidado que aproxima. Acesse sua rotina de saúde com tranquilidade.
          </p>
        </div>

        {/* Rodapé do Banner */}
        <div className="relative z-10 text-xs text-emerald-100/70 font-normal">
          © {CURRENT_YEAR} CuidaPapai+50. Todos os direitos reservados.
        </div>
      </section>

      {/* Lado Direito: Formulário (Ocupa a tela toda em mobile, metade no desktop) */}
      <main className="w-full md:w-1/2 lg:w-7/12 xl:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 min-h-screen">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Logo compacto visível apenas em telas mobile (< md) */}
          <div className="flex md:hidden items-center justify-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#FBBF24] fill-[#FBBF24]" />
            </div>
            <span className="text-2xl font-extrabold text-[#126E51]">
              CuidaPapai<span className="text-[#FBBF24]">+50</span>
            </span>
          </div>

          {/* Título do Formulário */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#126E51] tracking-tight">
              Que bom ver você por aqui!
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Entre com suas credenciais para continuar o acompanhamento.
            </p>
          </div>

          {/* Alerta de erro vermelho acima do formulário */}
          {error && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulário com inputs funcionais de 56px de altura e labels externas */}
          <form onSubmit={handleLogin} className="space-y-4 pt-1">
            {/* Campo E-mail */}
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
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  disabled={isLoading}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  disabled={isLoading}
                  className="w-full h-14 pl-12 pr-12 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-base focus:bg-white focus:outline-none focus:border-[#126E51] focus:ring-2 focus:ring-[#126E51]/20 transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Link Esqueci minha senha */}
            <div className="flex justify-end pt-1">
              <a
                href="#esqueci-senha"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Instruções para redefinir a senha foram enviadas ao seu e-mail.');
                }}
                className="text-sm font-semibold text-[#126E51] hover:text-[#0F5C47] underline underline-offset-4 transition-colors"
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Botão Entrar com loading indicator */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#126E51] hover:bg-[#0F5C47] text-white font-bold text-base rounded-xl shadow-xs transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>

          {/* Divisor "ou" */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                ou
              </span>
            </div>
          </div>

          {/* Botão Criar nova conta */}
          <button
            type="button"
            onClick={() => navigate('/cadastro')}
            className="w-full h-14 bg-amber-50 hover:bg-amber-100/80 border-2 border-[#FBBF24] text-[#126E51] font-bold text-base rounded-xl transition-colors duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center"
          >
            Criar nova conta
          </button>

          {/* Rodapé de Segurança e Privacidade */}
          <div className="pt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 font-medium select-none">
            <ShieldCheck className="w-4 h-4 text-[#126E51]" />
            <span>Seus dados de saúde estão protegidos.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
