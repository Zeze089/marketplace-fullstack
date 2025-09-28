// frontend/src/app/login/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

// Schema de validação
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string>('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data);
      router.push('/products');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Erro ao fazer login. Verifique suas credenciais.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Entrar na sua conta
            </CardTitle>
            <p className="text-gray-600">
              Entre para acessar o marketplace
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Input
                {...register('email')}
                type="email"
                label="Email"
                placeholder="seu@email.com"
                error={errors.email?.message}
                autoComplete="email"
                required
              />

              <Input
                {...register('password')}
                type="password"
                label="Senha"
                placeholder="Sua senha"
                error={errors.password?.message}
                autoComplete="current-password"
                required
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link 
                  href="/register" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center">
                Usuários de teste:
              </p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p><strong>Admin:</strong> admin@marketplace.com / admin123</p>
                <p><strong>User:</strong> user@marketplace.com / user123</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}