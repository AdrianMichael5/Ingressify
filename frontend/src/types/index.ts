export interface User {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  date: string;
  price: number;
  category: string;
  available: boolean;
  status: string;
  city: string;
  state: string;
  totalTickets: number;
  soldTickets: number;
  sellerName: string;
}

export interface SellerRequestData {
  businessName: string;
  document: string;
  phone: string;
  description: string;
}

export interface SellerRequestResponse {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  businessName: string;
  document: string;
  phone: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface CreateEventData {
  name: string;
  description: string;
  category: string;
  date: string;
  location: string;
  city: string;
  state: string;
  totalTickets: number;
  price: number;
  imageUrl: string;
  status: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
