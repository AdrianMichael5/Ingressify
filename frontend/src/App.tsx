import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Unauthorized from '@/pages/Unauthorized';
import SellerRequestPage from '@/pages/seller/SellerRequest';
import SellerDashboard from '@/pages/seller/SellerDashboard';
import EventForm from '@/pages/seller/EventForm';
import SellerRequests from '@/pages/admin/SellerRequests';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { SellerRoute } from '@/routes/SellerRoute';
import { AdminRoute } from '@/routes/AdminRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/seller/request" element={
              <PrivateRoute><SellerRequestPage /></PrivateRoute>
            } />

            <Route path="/seller/dashboard" element={
              <SellerRoute><SellerDashboard /></SellerRoute>
            } />
            <Route path="/seller/events/new" element={
              <SellerRoute><EventForm /></SellerRoute>
            } />
            <Route path="/seller/events/:id/edit" element={
              <SellerRoute><EventForm /></SellerRoute>
            } />

            <Route path="/admin/seller-requests" element={
              <AdminRoute><SellerRequests /></AdminRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
