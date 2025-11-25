// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Notification,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

function LoginPage() {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(false);

    if (!identifiant.trim()) {
      setLoginError("L'identifiant est requis");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: identifiant,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setLoginSuccess(true);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setLoginError(
        err.response?.data?.error || 'Identifiant ou mot de passe incorrect.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">

      <Paper
        shadow="xl"
        p={45}
        radius="xl"
        className="w-full max-w-md"
        withBorder={false}
        style={{ background: 'white' }}
      >
        <Title
          order={1}
          size={32}
          weight={700}
          align="center"
          color="#1e40af"
          className="mb-12"
        >
          Connexion RH
        </Title>

        {loginError && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            mb="lg"
            onClose={() => setLoginError(null)}
          >
            {loginError}
          </Notification>
        )}

        {loginSuccess && (
          <Notification icon={<IconCheck size={18} />} color="teal" mb="lg">
            Connexion réussie ! Redirection...
          </Notification>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          <TextInput
            label="Identifiant"
            placeholder="ex: Johary"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            required
            size="xl"
            radius="lg"
            variant="filled"
            styles={{
              label: { fontWeight: 600, fontSize: '1.1rem', marginBottom: 10 },
              input: {
                height: 56,
                fontSize: '1.1rem',
                backgroundColor: '#f9fafb',
                border: '2px solid #e5e7eb',
              },
            }}
          />

          <PasswordInput
            label="Mot de passe"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="xl"
            radius="lg"
            variant="filled"
            styles={{
              label: { fontWeight: 600, fontSize: '1.1rem', marginBottom: 10 },
              input: {
                height: 56,
                fontSize: '1.1rem',
                backgroundColor: '#f9fafb',
                border: '2px solid #e5e7eb',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            size="xl"
            loading={isLoading}
            loaderProps={{ size: 'sm' }}
            radius="xl"
            style={{
              height: 64,
              backgroundColor: '#3b82f6',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
            className="hover:bg-blue-700 transition-all shadow-lg"
          >
            Se connecter
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default LoginPage;