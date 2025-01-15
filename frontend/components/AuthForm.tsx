import { useState } from 'react';
import { Button, Input, Card, Spacer, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import '../styles/globals.css';
import Link from 'next/link';

const AuthForm = ({ type }: { type: 'login' | 'register' | 'reset-password' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('viewer');
  const router = useRouter();
  const { handleLogin, handleRegister, handleResetPassword } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (type === 'login') {
        await handleLogin(email, password);
        router.push('/dashboard');
      } else if (type === 'register') {
        await handleRegister(email, password, role);
        router.push('/auth/login');
      } else if (type === 'reset-password') {
        await handleResetPassword(email);
        router.push('/auth/login');
      }
    } catch (e) {
        setError('An error occurred, please try again.');
      }
    finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px',
      }}
    >
      <Card
      style={{
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        backgroundColor: '#fff',
      }}
      >
      <h3 style={{ margin: '0 0 24px', textAlign: 'center' }}>
        {type === 'login'
        ? 'Login'
        : type === 'register'
        ? 'Register'
        : 'Reset Password'}
      </h3>
      <Input
        fullWidth
        color="primary"
        size="lg"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {type !== 'reset-password' && (
        <>
        <Spacer y={1} />
        <Input
          fullWidth
          color="primary"
          size="lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </>
      )}
      {type === 'register' && (
        <>
        <Spacer y={1} />
        <select
          style={{
          width: '100%',
          padding: '8px',
          fontSize: '16px',
          marginTop: '8px',
          marginBottom: '8px',
          }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="organizer">Organizer</option>
        </select>
        </>
      )}
      <Spacer y={1} />
      <Button
        onPress={handleSubmit}
        disabled={loading}
        style={{
        width: '100%',
        fontWeight: 'bold',
        marginBottom: '8px',
        marginTop: '8px',
        }}
      >
        {loading ? (
        <Spinner />
        ) : type === 'login' ? (
        'Login'
        ) : type === 'register' ? (
        'Register'
        ) : (
        'Reset Password'
        )}
      </Button>
      {type === 'login' && (
        <>
        <Spacer y={0.5} />
        <Button
          onPress={() => router.push('/auth/register')}
          style={{ width: '100%', marginBottom: '8px', marginTop: '8px' }}
        >
          Register
        </Button>
        <Spacer y={0.5} />
        <Link
          href="/auth/reset-password"
          style={{
          color: '#0070f3',
          textDecoration: 'underline',
          display: 'block',
          marginBottom: '8px',
          }}
        >
          Reset Password
        </Link>
        </>
      )}
      {type === 'register' && (
        <>
        <Spacer y={1} />
        <p style={{ textAlign: 'center' }}>
          Already registered?{' '}
          <a
          href="#"
          onClick={() => router.push('/auth/login')}
          style={{ color: '#0070f3', textDecoration: 'underline' }}
          >
          Login Here
          </a>
        </p>
        </>
      )}
      {error && (
        <>
        <Spacer y={1} />
        <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{error}</p>
        </>
      )}
      </Card>
    </div>
  );
};

export default AuthForm;
