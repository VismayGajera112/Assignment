import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '../../hooks/withAuth';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';
import DashboardComponent from '../../components/Dashboard';
import Home from '../home';

const decodeRole = (token: string): string => {
  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded?.role || "";
  } catch {
    return "";
  }
};

const DashboardPage = () => {
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setRole(decodeRole(token));
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      {role === "viewer" ? (
      <Home />
      ) : (
      <>
        <h1 style={{ textAlign: 'center' }}>Welcome to the Smart Event Analytics Platform!</h1>
        <DashboardComponent />
      </>
      )}
    </div>
  );
};

export default withAuth(DashboardPage);