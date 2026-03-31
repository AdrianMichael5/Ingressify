import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, Ticket, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import type { AxiosError } from 'axios';

const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as { from?: string })?.from || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setApiError(error.response?.data?.message || 'E-mail ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-violet-600 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-white/10" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Ticket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Ingressify</span>
        </div>

        {/* Center content */}
        <div className="relative">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Sua plataforma de ingressos favorita
          </h2>
          <p className="text-violet-200 text-lg mb-8">
            Compre, venda e descubra eventos incríveis perto de você.
          </p>

          {/* Trust indicators */}
          <div className="space-y-3">
            {[
              'Ingressos 100% verificados',
              'Pagamento seguro e protegido',
              'Suporte especializado 24h',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="relative text-violet-300 text-sm">
          &copy; 2025 Ingressify
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Ticket className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Ingress<span className="text-violet-600">ify</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Bem-vindo de volta</h1>
            <p className="text-gray-500 mt-1 text-sm">Entre na sua conta para continuar</p>
          </div>

          {/* Error */}
          {apiError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="seu@email.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.email
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3 rounded-xl bg-white border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.password
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Não tem conta?{' '}
            <Link to="/register" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
              Cadastre-se grátis
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
              ← Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
