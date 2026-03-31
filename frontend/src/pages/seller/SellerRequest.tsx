import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { submitSellerRequest, getSellerRequestStatus } from '@/services/api';
import { Ticket, Store, FileText, Phone, AlignLeft, Loader2, Clock, XCircle, CheckCircle } from 'lucide-react';
import type { AxiosError } from 'axios';

const schema = z.object({
  businessName: z.string().min(1, 'Nome do estabelecimento é obrigatório'),
  document: z.string().min(1, 'CPF ou CNPJ é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function SellerRequest() {
  const { user } = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getSellerRequestStatus()
      .then((res) => {
        setStatus(res?.status || null);
      })
      .catch(() => setStatus(null))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: FormData) => {
    setApiError('');
    setSubmitting(true);
    try {
      await submitSellerRequest({
        businessName: data.businessName,
        document: data.document,
        phone: data.phone,
        description: data.description || '',
      });
      setSuccess(true);
      setStatus('PENDING');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setApiError(error.response?.data?.message || 'Erro ao enviar solicitação');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (user?.role === 'SELLER') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Você já é um vendedor!</h1>
          <Link to="/seller/dashboard" className="text-violet-600 hover:text-violet-700 font-medium">
            Ir para o Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'PENDING' || success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Solicitação em análise</h1>
          <p className="text-gray-500 mb-6">Aguarde a aprovação do administrador.</p>
          <Link to="/" className="text-violet-600 hover:text-violet-700 font-medium">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md py-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Ingress<span className="text-violet-600">ify</span>
            </span>
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Quero ser Vendedor</h1>
            <p className="text-gray-500 mt-1">Preencha seus dados para solicitar</p>
          </div>

          {status === 'REJECTED' && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" />
              Sua solicitação anterior foi recusada. Tente novamente.
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do estabelecimento</label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('businessName')}
                  placeholder="Ex: Shows do João"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>
              {errors.businessName && <p className="mt-1 text-sm text-red-500">{errors.businessName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">CPF ou CNPJ</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('document')}
                  placeholder="000.000.000-00"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>
              {errors.document && <p className="mt-1 text-sm text-red-500">{errors.document.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('phone')}
                  placeholder="(00) 00000-0000"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição (opcional)</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Ex: Produtor de shows independentes"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
              ) : (
                'Enviar Solicitação'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
