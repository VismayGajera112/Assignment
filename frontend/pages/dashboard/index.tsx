import { useRouter } from 'next/router';
import { withAuth } from '../../hooks/withAuth';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default withAuth(Dashboard);