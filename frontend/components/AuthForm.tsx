import { useState } from 'react';
import { Button, Input, Card, Spacer, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

const AuthForm = ({ type }: { type: 'login' | 'register' | 'reset-password' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
        await handleRegister(email, password, 'viewer'); // Assuming 'viewer' as default role
        router.push('/auth/login');
      } else if (type === 'reset-password') {
        await handleResetPassword(email);
        router.push('/auth/login');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError((e as any).response?.data?.message || 'An error occurred, please try again.');
      } else {
        setError('An error occurred, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        style={{
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h3 style={{ margin: '0 0 16px' }}>
          {type === 'login' ? 'Login' : type === 'register' ? 'Register' : 'Reset Password'}
        </h3>
        <Input
          isClearable
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
              isClearable
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
        <Spacer y={1} />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner/> : type === 'login' ? 'Login' : type === 'register' ? 'Register' : 'Reset Password'}
        </Button>
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
