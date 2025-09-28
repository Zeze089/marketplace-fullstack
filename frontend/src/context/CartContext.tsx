// frontend/src/context/CartContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart } from '@/types';
import { cartService } from '@/services/cart.service';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  itemCount: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  showAddedAnimation: boolean;
  triggerAddedAnimation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const { isAuthenticated } = useAuth();

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setIsLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const updatedCart = await cartService.addToCart({ productId, quantity });
      setCart(updatedCart);
      triggerAddedAnimation();
    } catch (error) {
      throw error;
    }
  };

  const triggerAddedAnimation = () => {
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 2000);
  };

  // Carregar carrinho quando usuário estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const itemCount = cart?.summary?.totalItems || 0;

  const value: CartContextType = {
    cart,
    itemCount,
    isLoading,
    refreshCart,
    addToCart,
    showAddedAnimation,
    triggerAddedAnimation,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}