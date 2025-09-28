// frontend/src/services/auth.service.ts

import api from './api';
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User
} from '@/types';

class AuthService {
  // Login do usuário
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);

    // A API retorna: { statusCode, message, access_token, user }
    const { access_token, user } = response.data;

    // Salvar token e dados do usuário
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return { access_token, user };
  }

  // Registro de novo usuário
  async register(userData: RegisterRequest): Promise<{ user: User; message: string }> {
    const response = await api.post('/auth/register', userData);

    return {
      user: response.data.user,
      message: response.data.message
    };
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Verificar se usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obter usuário atual do localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Verificar perfil (validar token)
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data.user;
  }

  // Verificar se usuário é admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }
}

export const authService = new AuthService();