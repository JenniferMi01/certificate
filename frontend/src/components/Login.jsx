import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Alert } from '@mantine/core';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(username, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper shadow="md" p="xl" style={{ width: 400 }}>
        <Title order={2} align="center" mb="md">
          Connexion
        </Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nom d'utilisateur"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            mb="sm"
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb="md"
          />
          {error && (
            <Alert color="red" mb="md">
              {error}
            </Alert>
          )}
          <Button type="submit" fullWidth loading={loading}>
            Se connecter
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
