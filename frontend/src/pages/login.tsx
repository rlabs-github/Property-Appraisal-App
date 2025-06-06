// src/pages/login.tsx
import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { from } = router.query;
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push(from ? String(from) : '/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return null;
};

export default LoginPage;