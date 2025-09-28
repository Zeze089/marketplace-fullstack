// frontend/src/components/ProductModal.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { CreateProductRequest, Product } from '@/types';
import { productsService } from '@/services/products.service';
import { X } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  stock: z.number().min(0, 'Estoque não pode ser negativo').int('Estoque deve ser um número inteiro'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  imageUrl: z.string().url('URL da imagem deve ser válida').optional().or(z.literal('')),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

export function ProductModal({ isOpen, onClose, onSuccess, product }: ProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
    } : undefined,
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      setError('');

      const productData: CreateProductRequest = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        imageUrl: data.imageUrl || 'https://via.placeholder.com/300x300?text=Produto',
      };

      if (isEditing) {
        await productsService.updateProduct(product.id, productData);
      } else {
        await productsService.createProduct(productData);
      }

      onSuccess();
      onClose();
      reset();
    } catch (err: any) {
      setError(err.response?.data?.message || `Erro ao ${isEditing ? 'atualizar' : 'criar'} produto`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Input
                {...register('name')}
                label="Nome do Produto"
                placeholder="Ex: iPhone 15 Pro"
                error={errors.name?.message}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  placeholder="Descrição detalhada do produto"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  label="Preço (R$)"
                  placeholder="99.99"
                  error={errors.price?.message}
                  required
                />

                <Input
                  {...register('stock', { valueAsNumber: true })}
                  type="number"
                  label="Estoque"
                  placeholder="100"
                  error={errors.stock?.message}
                  required
                />
              </div>

              <Input
                {...register('category')}
                label="Categoria"
                placeholder="Ex: Eletrônicos"
                error={errors.category?.message}
                required
              />

              <Input
                {...register('imageUrl')}
                type="url"
                label="URL da Imagem"
                placeholder="https://exemplo.com/imagem.jpg"
                error={errors.imageUrl?.message}
                helperText="Deixe vazio para usar uma imagem padrão"
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isEditing ? 'Atualizando...' : 'Criando...') 
                    : (isEditing ? 'Atualizar' : 'Criar')
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}