import axios from 'axios';
import type { AuthResponse, Event, LoginForm, RegisterForm, SellerRequestData, SellerRequestResponse, CreateEventData } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export async function registerUser(data: RegisterForm): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export async function loginUser(data: LoginForm): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
}

// Events (public)
export async function getEvents(): Promise<Event[]> {
  const response = await api.get<Event[]>('/events');
  return response.data;
}

export async function getEventById(id: number): Promise<Event> {
  const response = await api.get<Event>(`/events/${id}`);
  return response.data;
}

// Events (seller)
export async function getMyEvents(): Promise<Event[]> {
  const response = await api.get<Event[]>('/events/my');
  return response.data;
}

export async function createEvent(data: CreateEventData): Promise<Event> {
  const response = await api.post<Event>('/events', data);
  return response.data;
}

export async function updateEvent(id: number, data: CreateEventData): Promise<Event> {
  const response = await api.put<Event>(`/events/${id}`, data);
  return response.data;
}

export async function updateEventStatus(id: number, status: string): Promise<Event> {
  const response = await api.patch<Event>(`/events/${id}/status`, { status });
  return response.data;
}

export async function deleteEvent(id: number): Promise<void> {
  await api.delete(`/events/${id}`);
}

// Seller requests
export async function submitSellerRequest(data: SellerRequestData): Promise<SellerRequestResponse> {
  const response = await api.post<SellerRequestResponse>('/seller/request', data);
  return response.data;
}

export async function getSellerRequestStatus(): Promise<SellerRequestResponse | null> {
  const response = await api.get('/seller/request/status');
  if (response.status === 204) return null;
  return response.data;
}

// Admin
export async function getPendingSellerRequests(): Promise<SellerRequestResponse[]> {
  const response = await api.get<SellerRequestResponse[]>('/admin/seller-requests');
  return response.data;
}

export async function approveSellerRequest(id: number): Promise<SellerRequestResponse> {
  const response = await api.patch<SellerRequestResponse>(`/admin/seller-requests/${id}/approve`);
  return response.data;
}

export async function rejectSellerRequest(id: number): Promise<SellerRequestResponse> {
  const response = await api.patch<SellerRequestResponse>(`/admin/seller-requests/${id}/reject`);
  return response.data;
}

export default api;
