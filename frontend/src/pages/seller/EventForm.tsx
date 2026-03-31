import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createEvent, updateEvent, getEventById } from '@/services/api';
import { Ticket, Loader2 } from 'lucide-react';
import type { AxiosError } from 'axios';

const schema = z.object({
  name: z.string().min(1, 'Nome do evento é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  location: z.string().min(1, 'Local é obrigatório'),
  city: z.string().optional(),
  state: z.string().optional(),
  totalTickets: z.coerce.number().min(1, 'Mínimo de 1 ingresso'),
  price: z.coerce.number().min(0.01, 'Preço mínimo é R$ 0,01'),
  imageUrl: z.string().optional(),
  status: z.string().default('DRAFT'),
});

type FormData = z.infer<typeof schema>;

const categories = ['Shows', 'Esportes', 'Teatro', 'Festivais', 'Outros'];

export default function EventForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loadingEvent, setLoadingEvent] = useState(isEdit);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'DRAFT' },
  });

  useEffect(() => {
    if (isEdit && id) {
      getEventById(Number(id))
        .then((event) => {
          reset({
            name: event.name,
            description: event.description,
            category: event.category,
            date: event.date ? event.date.slice(0, 16) : '',
            location: event.location,
            city: event.city || '',
            state: event.state || '',
            totalTickets: event.totalTickets,
            price: event.price,
            imageUrl: event.imageUrl || '',
            status: event.status,
          });
        })
        .catch(() => navigate('/seller/dashboard'))
        .finally(() => setLoadingEvent(false));
    }
  }, [id, isEdit, navigate, reset]);

  const onSubmit = async (data: FormData) => {
    setApiError('');
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        city: data.city || '',
        state: data.state || '',
        imageUrl: data.imageUrl || '',
      };
      if (isEdit) {
        await updateEvent(Number(id), payload);
      } else {
        await createEvent(payload);
      }
      navigate('/seller/dashboard');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setApiError(error.response?.data?.message || 'Erro ao salvar evento');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Ticket className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Ingressify</span>
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEdit ? 'Editar Evento' : 'Criar Novo Evento'}
          </h1>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do evento</label>
              <input {...register('name')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição</label>
              <textarea {...register('description')} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoria</label>
                <select {...register('category')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                  <option value="">Selecione</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Data e horário</label>
                <input type="datetime-local" {...register('date')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Local / Endereço</label>
              <input {...register('location')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
                <input {...register('city')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
                <input {...register('state')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantidade de ingressos</label>
                <input type="number" {...register('totalTickets')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
                {errors.totalTickets && <p className="mt-1 text-sm text-red-500">{errors.totalTickets.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preço (R$)</label>
                <input type="number" step="0.01" {...register('price')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL da imagem de capa</label>
              <input {...register('imageUrl')} placeholder="https://exemplo.com/imagem.jpg" className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select {...register('status')} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                <option value="DRAFT">Rascunho</option>
                <option value="PUBLISHED">Publicado</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/seller/dashboard')}
                className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Salvando...</>
                ) : (
                  isEdit ? 'Salvar Alterações' : 'Criar Evento'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
