import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, register, resetPassword } from '../services/auth';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token); // Store token
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, role: string) => {
    try {
      setLoading(true);
      setError(null);
      await register({ email, password, role });
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await resetPassword({ email });
      alert('Password reset link sent to your email');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Reset password failed');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleResetPassword, loading, error };
};

export { useAuth };
