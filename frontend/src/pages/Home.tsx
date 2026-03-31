import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/services/api';
import {
  Search,
  MapPin,
  Calendar,
  Ticket,
  Music,
  Trophy,
  Theater,
  PartyPopper,
  LogOut,
  User,
  ArrowRight,
  Filter,
  TrendingUp,
  Star,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';
import type { Event } from '@/types';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const categories = [
  { name: 'Shows', icon: Music, color: 'bg-violet-600', light: 'bg-violet-50 text-violet-600', count: '120+' },
  { name: 'Esportes', icon: Trophy, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-600', count: '80+' },
  { name: 'Teatro', icon: Theater, color: 'bg-rose-500', light: 'bg-rose-50 text-rose-600', count: '45+' },
  { name: 'Festivais', icon: PartyPopper, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600', count: '30+' },
];

const categoryColors: Record<string, string> = {
  Shows: 'bg-violet-100 text-violet-700',
  Esportes: 'bg-amber-100 text-amber-700',
  Teatro: 'bg-rose-100 text-rose-700',
  Festivais: 'bg-emerald-100 text-emerald-700',
  Outros: 'bg-gray-100 text-gray-700',
};

function getBadge(event: Event) {
  if (event.totalTickets && event.soldTickets) {
    const pct = event.soldTickets / event.totalTickets;
    if (pct >= 0.9) return { label: 'Últimos ingressos', cls: 'bg-red-500 text-white' };
    if (pct >= 0.7) return { label: 'Esgotando', cls: 'bg-orange-500 text-white' };
  }
  return null;
}

function EventCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
        <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 bg-gray-200 rounded-lg w-24" />
          <div className="h-9 bg-gray-200 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const badge = getBadge(event);
  const catColor = categoryColors[event.category] || categoryColors['Outros'];

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
    } else {
      alert('Funcionalidade em breve!');
    }
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${catColor}`}>
            {event.category}
          </span>
          {badge && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
              {badge.label}
            </span>
          )}
        </div>

        {/* Price overlay bottom */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm">
            <p className="text-xs text-gray-500 leading-none mb-0.5">a partir de</p>
            <p className="text-base font-bold text-gray-900 leading-none">{formatPrice(event.price)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors">
          {event.name}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-violet-400" />
            <span className="truncate">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-violet-400" />
            <span className="truncate">{event.location}{event.city ? `, ${event.city}` : ''}</span>
          </div>
        </div>

        <button
          onClick={handleBuy}
          className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 group/btn"
        >
          Comprar Ingresso
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Search className="w-9 h-9 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Nenhum evento encontrado</h3>
      <p className="text-gray-500 text-sm max-w-xs">
        {query ? `Não encontramos eventos para "${query}". Tente outro termo.` : 'Nenhum evento disponível no momento.'}
      </p>
    </div>
  );
}

const sortOptions = [
  { value: 'date', label: 'Data' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
];

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('date');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'Todos') {
      result = result.filter((e) => e.category === activeCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return result;
  }, [events, search, activeCategory, sortBy]);

  const userInitials = user?.name
    ? user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <Ticket className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Ingress<span className="text-violet-600">ify</span>
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <a href="#eventos" className="px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium">
                Eventos
              </a>
              <a href="#categorias" className="px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium">
                Categorias
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <button
                      onClick={() => navigate('/admin/seller-requests')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors border border-amber-200 cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Admin
                    </button>
                  )}
                  {user?.role === 'SELLER' ? (
                    <button
                      onClick={() => navigate('/seller/dashboard')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-colors border border-violet-200 cursor-pointer"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Meus Eventos
                    </button>
                  ) : user?.role === 'USER' ? (
                    <button
                      onClick={() => navigate('/seller/request')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      Ser Vendedor
                    </button>
                  ) : null}

                  {/* Avatar */}
                  <div className="flex items-center gap-2 pl-1">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-violet-700">{userInitials}</span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors text-sm cursor-pointer"
                    title="Sair"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium cursor-pointer"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 active:scale-95 transition-all cursor-pointer"
                  >
                    Cadastrar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-6 border border-violet-100">
              <TrendingUp className="w-3.5 h-3.5" />
              Mais de 300 eventos disponíveis
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
              Encontre ingressos para{' '}
              <span className="text-violet-600">qualquer evento</span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              Compre e venda ingressos com segurança para shows, esportes, teatro e festivais.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por evento, artista ou local..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-all shadow-sm text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Pagamento seguro
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Ingressos verificados
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Suporte 24h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENTS ─── */}
      <section id="eventos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section Header + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Eventos em Destaque</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {isLoading ? 'Carregando...' : `${filteredEvents.length} evento${filteredEvents.length !== 1 ? 's' : ''} encontrado${filteredEvents.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-400 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {['Todos', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(8)].map((_, i) => <EventCardSkeleton key={i} />)
          ) : filteredEvents.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section id="categorias" className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Explorar por Categoria</h2>
              <p className="text-gray-500 text-sm mt-0.5">Encontre eventos do seu estilo</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative rounded-2xl p-6 text-left bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{cat.count} eventos</p>
                <ChevronRight className="absolute bottom-5 right-5 w-4 h-4 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      {!isAuthenticated && (
        <section className="bg-violet-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Quer vender ingressos?</h3>
              <p className="text-violet-200 mt-1 text-sm">Crie uma conta e solicite acesso de vendedor.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors cursor-pointer"
              >
                Criar Conta Grátis
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                Entrar
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Ticket className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">
                Ingress<span className="text-violet-400">ify</span>
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Sobre</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>

            <p className="text-sm text-gray-500">
              &copy; 2025 Ingressify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
