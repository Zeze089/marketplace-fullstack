// frontend/src/app/register/page.tsx

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
import { cpfMask, phoneMask, validateCpf, validatePhone, removeCpfMask, removePhoneMask } from '@/utils/masks';

// Schema de validação
const registerSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  cpf: z.string()
    .min(1, 'CPF é obrigatório')
    .refine((cpf) => validateCpf(cpf), 'CPF inválido'),
  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .refine((phone) => validatePhone(phone), 'Telefone inválido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { register: registerUser, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Aplicar máscaras em tempo real
  const cpfValue = watch('cpf');
  const phoneValue = watch('phone');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = cpfMask(e.target.value);
    setValue('cpf', masked);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = phoneMask(e.target.value);
    setValue('phone', masked);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      setSuccess('');

      // Remover máscaras antes de enviar
      const userData = {
        name: data.name,
        email: data.email,
        cpf: removeCpfMask(data.cpf),
        phone: removePhoneMask(data.phone),
        password: data.password,
      };

      const result = await registerUser(userData);
      setSuccess(result.message);
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Erro ao criar conta. Tente novamente.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Criar nova conta
            </CardTitle>
            <p className="text-gray-600">
              Cadastre-se para acessar o marketplace
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <Input
                {...register('name')}
                type="text"
                label="Nome Completo"
                placeholder="Seu nome completo"
                error={errors.name?.message}
                autoComplete="name"
                required
              />

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
                {...register('cpf')}
                type="text"
                label="CPF"
                placeholder="000.000.000-00"
                value={cpfValue || ''}
                onChange={handleCpfChange}
                error={errors.cpf?.message}
                autoComplete="off"
                maxLength={14}
                required
              />

              <Input
                {...register('phone')}
                type="text"
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={phoneValue || ''}
                onChange={handlePhoneChange}
                error={errors.phone?.message}
                autoComplete="tel"
                maxLength={15}
                required
              />

              <Input
                {...register('password')}
                type="password"
                label="Senha"
                placeholder="Mínimo 6 caracteres"
                error={errors.password?.message}
                autoComplete="new-password"
                required
              />

              <Input
                {...register('confirmPassword')}
                type="password"
                label="Confirmar Senha"
                placeholder="Digite a senha novamente"
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
                required
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center w-full">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Entre aqui
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}