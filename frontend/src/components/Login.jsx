import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Alert } from '@mantine/core';
import { useAuth } from '../AuthContext';
import { FileText, Shield, Printer } from 'lucide-react';
import logo from './models/assets/img/logo.png';

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
    <div className="flex h-screen">
      {/* Left banner */}
      <div className="hidden md:flex w-1/2 bg-slate-800 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-32 right-8 w-96 h-96 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-white rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg object-contain bg-white p-1" />
            <span className="text-xl font-bold tracking-wide">Blueline RH</span>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Gestion des certificats
            <br />
            & attestations
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-md">
            Plateforme de gestion et d'impression des documents RH.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Attestations & Certificats</p>
                <p className="text-slate-400 text-xs">Attestation de travail, certificat de travail, attestation de congé</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                <Printer size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Impression directe</p>
                <p className="text-slate-400 text-xs">Générez et imprimez vos documents en un clic</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Accès sécurisé</p>
                <p className="text-slate-400 text-xs">Réservé au personnel RH autorisé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-slate-500 text-xs">&copy; {new Date().getFullYear()} Blueline. Tous droits réservés.</p>
        </div>
      </div>

      {/* Right login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
            <span className="text-lg font-bold text-slate-800">Blueline RH</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-1">Connexion</h2>
          <p className="text-slate-500 text-sm mb-8">Entrez vos identifiants pour accéder à la plateforme</p>

          <form onSubmit={handleSubmit}>
            <TextInput
              label="Nom d'utilisateur"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              mb="sm"
              size="md"
            />
            <PasswordInput
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mb="lg"
              size="md"
            />
            {error && (
              <Alert color="red" mb="md" variant="light">
                {error}
              </Alert>
            )}
            <Button type="submit" fullWidth loading={loading} size="md" color="dark">
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
