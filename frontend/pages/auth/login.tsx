import AuthForm from '../../components/AuthForm';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
