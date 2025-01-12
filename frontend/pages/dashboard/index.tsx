import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '../../hooks/withAuth';
import '../../styles/globals.css';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here
    // Example: Clear tokens, call logout API, etc.
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      // Client-side-only code
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default withAuth(Dashboard);
