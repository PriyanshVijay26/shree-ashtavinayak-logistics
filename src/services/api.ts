import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, ApiResponse, City, User } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<RegisterRequest>): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.put<ApiResponse<{ user: User }>>('/auth/profile', userData);
    return response.data;
  },
};

export const cityAPI = {
  getAllCities: async (): Promise<ApiResponse<{ cities: City[] }>> => {
    const response = await apiClient.get<ApiResponse<{ cities: City[] }>>('/cities');
    return response.data;
  },

  getCityById: async (id: string): Promise<ApiResponse<{ city: City }>> => {
    const response = await apiClient.get<ApiResponse<{ city: City }>>(`/cities/${id}`);
    return response.data;
  },

  // Admin only endpoints
  getAllCitiesAdmin: async (): Promise<ApiResponse<{ cities: City[] }>> => {
    const response = await apiClient.get<ApiResponse<{ cities: City[] }>>('/cities/admin');
    return response.data;
  },

  createCity: async (cityData: Omit<City, 'id'>): Promise<ApiResponse<{ city: City }>> => {
    const response = await apiClient.post<ApiResponse<{ city: City }>>('/cities', cityData);
    return response.data;
  },

  updateCity: async (id: string, cityData: Partial<City>): Promise<ApiResponse<{ city: City }>> => {
    const response = await apiClient.put<ApiResponse<{ city: City }>>(`/cities/${id}`, cityData);
    return response.data;
  },

  deleteCity: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await apiClient.delete<ApiResponse<{}>>(`/cities/${id}`);
    return response.data;
  },
};

export const userAPI = {
  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<ApiResponse<{ users: User[]; pagination: any }>> => {
    const response = await apiClient.get<ApiResponse<{ users: User[]; pagination: any }>>('/users', { params });
    return response.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(`/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id: string, role: 'ADMIN' | 'USER'): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.put<ApiResponse<{ user: User }>>(`/users/${id}/role`, { role });
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await apiClient.delete<ApiResponse<{}>>(`/users/${id}`);
    return response.data;
  },

  getUserStats: async (): Promise<ApiResponse<{ stats: any }>> => {
    const response = await apiClient.get<ApiResponse<{ stats: any }>>('/users/stats/overview');
    return response.data;
  },
};

export default apiClient;