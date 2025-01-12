import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const withAuth = (Component: React.FC) => {
  return () => {
    const router = useRouter();
    const token = typeof window !== 'undefined' && localStorage.getItem('token');

    useEffect(() => {
      if (!token) {
        router.push('/auth/login');
      }
    }, [router, token]);

    return token ? <Component /> : null;
  };
};
