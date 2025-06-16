import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, RegisterData } from '../types/auth';
import { authApi } from '../api/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(credentials);
      if (response && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        toast.success('¡Inicio de sesión exitoso!');
        return response;
      }
      throw new Error('Respuesta inválida del servidor');
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          errorMessage = error.response?.data?.message || error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.register(data);
      if (response && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        toast.success('¡Registro exitoso!');
        return response;
      }
      throw new Error('Respuesta inválida del servidor');
    } catch (error) {
      let errorMessage = 'Error al registrarse';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearUser();
    localStorage.removeItem('token');
    toast.success('¡Sesión cerrada exitosamente!');
    navigate('/login');
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
}; 