// frontend/src/app/cart/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Cart, CartItem } from '@/types';
import { cartService } from '@/services/cart.service';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/utils/masks';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { handleImageError, getSmartProductImage } from '@/utils/productImages';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [updatingItem, setUpdatingItem] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadCart();
  }, [isAuthenticated, router]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar carrinho');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeItem(productId);
      return;
    }

    try {
      setUpdatingItem(productId);
      const updatedCart = await cartService.updateQuantity({ productId, quantity: newQuantity });
      setCart(updatedCart);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao atualizar quantidade');
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      setUpdatingItem(productId);
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao remover item');
    } finally {
      setUpdatingItem(null);
    }
  };

  const clearCart = async () => {
    if (!confirm('Tem certeza que deseja limpar o carrinho?')) {
      return;
    }

    try {
      await cartService.clearCart();
      setCart({
        cart: { userId: cart?.cart.userId || 0, itemCount: 0 },
        items: [],
        summary: { totalItems: 0, totalPrice: 0, itemCount: 0 }
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao limpar carrinho');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando carrinho...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadCart}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6">Adicione alguns produtos para começar suas compras</p>
          <Link href="/products">
            <Button>Continuar comprando</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Carrinho de Compras</h1>
        <p className="text-gray-600 mt-2">
          {cart.summary.totalItems} {cart.summary.totalItems === 1 ? 'item' : 'itens'} no seu carrinho
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Lista de Itens */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Itens do Carrinho</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar carrinho
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {cart.items.map((item: CartItem) => (
                  <div key={item.id} className="p-6 flex items-center space-x-4">
                    {/* Imagem do Produto */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.product.imageUrl || getSmartProductImage(item.product.name, item.product.category)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(e, item.product.name, item.product.category)}
                      />
                    </div>

                    {/* Informações do Produto */}
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.category}</p>
                      <p className="text-lg font-semibold text-blue-600 mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={updatingItem === item.product.id}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {updatingItem === item.product.id ? '...' : item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={updatingItem === item.product.id || item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Subtotal e Remover */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.subtotal)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        disabled={updatingItem === item.product.id}
                        className="mt-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatPrice(cart.summary.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frete:</span>
                <span className="font-medium text-green-600">Grátis</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(cart.summary.totalPrice)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button className="w-full" size="lg">
                Finalizar Compra
              </Button>
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full">
                  Continuar comprando
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}