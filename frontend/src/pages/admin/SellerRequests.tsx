import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getPendingSellerRequests, approveSellerRequest, rejectSellerRequest } from '@/services/api';
import { Ticket, CheckCircle, XCircle, Loader2, ShieldCheck, LogOut, Calendar, Phone, FileText, Store } from 'lucide-react';
import type { SellerRequestResponse } from '@/types';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function SellerRequests() {
  const { user, logout } = useAuth();
  const [requests, setRequests] = useState<SellerRequestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadRequests = () => {
    setLoading(true);
    getPendingSellerRequests()
      .then(setRequests)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadRequests(); }, []);

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      await approveSellerRequest(id);
      loadRequests();
    } catch { /* ignore */ }
    setProcessingId(null);
  };

  const handleReject = async (id: number) => {
    setProcessingId(id);
    try {
      await rejectSellerRequest(id);
      loadRequests();
    } catch { /* ignore */ }
    setProcessingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <Ticket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Ingress<span className="text-violet-600">ify</span>
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{user?.name} (Admin)</span>
              <Link to="/" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">Home</Link>
              <button onClick={logout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-6 h-6 text-violet-600" />
          <h1 className="text-2xl font-bold text-gray-900">Solicitações de Vendedor</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Nenhuma solicitação pendente.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">{req.userName}</h3>
                    <p className="text-sm text-gray-500">{req.userEmail}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-400" />
                        {req.businessName}
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        {req.document}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {req.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(req.createdAt)}
                      </div>
                    </div>
                    {req.description && (
                      <p className="text-sm text-gray-500 mt-2 italic">"{req.description}"</p>
                    )}
                  </div>
                  <div className="flex sm:flex-col gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      disabled={processingId === req.id}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {processingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      disabled={processingId === req.id}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeitar
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
