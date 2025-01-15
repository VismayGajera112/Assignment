import AuthForm from '../../components/AuthForm';

const ResetPasswordPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <AuthForm type="reset-password" />
    </div>
  );
};

export default ResetPasswordPage;
