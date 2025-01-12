import AuthForm from '../../components/AuthForm';
import '../../styles/globals.css';

const RegisterPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;
