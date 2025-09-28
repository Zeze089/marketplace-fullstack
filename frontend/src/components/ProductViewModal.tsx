// frontend/src/components/ProductViewModal.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { cartService } from '@/services/cart.service';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/utils/masks';
import { getSmartProductImage, handleImageError } from '@/utils/productImages';
import { X, ShoppingCart, Package, Tag, Calendar, Star } from 'lucide-react';

interface ProductViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductViewModal({ product, isOpen, onClose }: ProductViewModalProps) {
  const [addingToCart, setAddingToCart] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho');
      return;
    }

    if (product.stock === 0) {
      alert('Produto fora de estoque');
      return;
    }

    try {
      setAddingToCart(true);
      await addToCartContext(product.id, 1);
      // A animação é acionada automaticamente pelo context
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao adicionar produto ao carrinho');
    } finally {
      setAddingToCart(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Fora de estoque', color: 'text-red-600 bg-red-50' };
    if (product.stock <= 5) return { text: 'Últimas unidades', color: 'text-orange-600 bg-orange-50' };
    return { text: 'Em estoque', color: 'text-green-600 bg-green-50' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="relative">
          {/* Botão Fechar */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Coluna da Imagem */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src={product.imageUrl || getSmartProductImage(product.name, product.category)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, product.name, product.category)}
                />
                
                {/* Badge de Status */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>
              </div>

              {/* Informações Rápidas */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Package className="h-4 w-4" />
                  <span>{product.stock} unidades</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Tag className="h-4 w-4" />
                  <span>{product.category}</span>
                </div>
              </div>
            </div>

            {/* Coluna das Informações */}
            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {product.name}
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                {/* Descrição */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Especificações */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Especificações</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Categoria:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Estoque disponível:</span>
                      <span className="font-medium">{product.stock} unidades</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">
                        {product.isActive ? 'Produto ativo' : 'Produto inativo'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Cadastrado em:</span>
                      <span className="font-medium">{formatDate(product.createdAt)}</span>
                    </div>
                    {product.updatedAt !== product.createdAt && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Última atualização:</span>
                        <span className="font-medium">{formatDate(product.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Avaliação Fictícia */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliações</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">(4.8/5 - 127 avaliações)</span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3 pt-4">
                  {isAuthenticated && (
                    <Button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0 || addingToCart}
                      isLoading={addingToCart}
                      className="w-full"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {addingToCart 
                        ? 'Adicionando...' 
                        : product.stock === 0 
                          ? 'Produto Indisponível' 
                          : 'Adicionar ao Carrinho'
                      }
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Continuar navegando
                  </Button>
                </div>

                {/* Informações Extras */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Informações de Entrega</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Frete grátis para todo o Brasil</li>
                    <li>• Entrega em até 5 dias úteis</li>
                    <li>• Garantia de 12 meses</li>
                    <li>• Devolução gratuita em 30 dias</li>
                  </ul>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}