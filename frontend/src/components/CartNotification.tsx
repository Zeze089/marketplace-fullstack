// frontend/src/components/CartNotification.tsx

'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle, ShoppingCart } from 'lucide-react';

export function CartNotification() {
  const { showAddedAnimation } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showAddedAnimation) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [showAddedAnimation]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 transform transition-all duration-500 ease-out">
      <div className={`
        bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3
        animate-bounce
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        <div className="relative">
          <CheckCircle className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full animate-ping"></div>
        </div>
        <div>
          <p className="font-semibold">Produto adicionado!</p>
          <p className="text-sm text-green-100">Item adicionado ao carrinho com sucesso</p>
        </div>
        <ShoppingCart className="h-5 w-5 animate-pulse" />
      </div>
    </div>
  );
}