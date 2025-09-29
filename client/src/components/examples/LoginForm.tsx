import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  const handleLogin = (username: string, password: string) => {
    console.log('Login attempted with:', { username, password });
  };

  return <LoginForm onLogin={handleLogin} />;
}