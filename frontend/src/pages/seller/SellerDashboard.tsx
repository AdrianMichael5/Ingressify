import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getMyEvents, updateEventStatus, deleteEvent } from '@/services/api';
import { Ticket, Plus, Calendar, MapPin, Pencil, Trash2, Eye, EyeOff, Loader2, LayoutDashboard, LogOut } from 'lucide-react';
import type { Event } from '@/types';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = () => {
    setLoading(true);
    getMyEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadEvents(); }, []);

  const handleToggleStatus = async (event: Event) => {
    const newStatus = event.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    await updateEventStatus(event.id, newStatus);
    loadEvents();
  };

  const handleDelete = async (event: Event) => {
    if (!confirm(`Tem certeza que deseja excluir "${event.name}"?`)) return;
    try {
      await deleteEvent(event.id);
      loadEvents();
    } catch {
      alert('Não é possível excluir evento com ingressos vendidos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Ticket className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Ingressify</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{user?.name}</span>
              <Link to="/" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
              <button onClick={logout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Dashboard do Vendedor</h1>
          </div>
          <button
            onClick={() => navigate('/seller/events/new')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Novo Evento
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Você ainda não criou nenhum evento.</p>
            <button
              onClick={() => navigate('/seller/events/new')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Criar primeiro evento
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.name} className="w-full h-40 object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{event.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {event.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                  <div className="space-y-1 mb-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Ingressos: <span className="font-semibold">{event.soldTickets}</span> / {event.totalTickets}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/seller/events/${event.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" /> Editar
                    </button>
                    <button
                      onClick={() => handleToggleStatus(event)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {event.status === 'PUBLISHED' ? (
                        <><EyeOff className="w-3 h-3" /> Ocultar</>
                      ) : (
                        <><Eye className="w-3 h-3" /> Publicar</>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      disabled={event.soldTickets > 0}
                      className="px-3 py-2 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
