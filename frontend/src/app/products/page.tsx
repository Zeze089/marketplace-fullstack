// frontend/src/app/products/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { productsService } from '@/services/products.service';
import { cartService } from '@/services/cart.service';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ProductModal } from '@/components/ProductModal';
import { ProductViewModal } from '@/components/ProductViewModal';
import { formatPrice } from '@/utils/masks';
import { handleImageError, getSmartProductImage } from '@/utils/productImages';
import { ShoppingCart, Plus, Edit, Trash2 } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<number | null>(null);
  
  // Estados do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Estados do modal de visualização
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart: addToCartContext } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const handleViewProduct = (product: Product) => {
  setViewingProduct(product);
  setIsViewModalOpen(true);
};

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho');
      return;
    }

    try {
      setAddingToCart(productId);
      await addToCartContext(productId, 1);
      // A animação é acionada automaticamente pelo context
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao adicionar produto ao carrinho');
    } finally {
      setAddingToCart(null);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${productName}"?`)) {
      return;
    }

    try {
      setDeletingProduct(productId);
      await productsService.deleteProduct(productId);
      await loadProducts(); // Recarregar lista
      alert('Produto excluído com sucesso!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao excluir produto');
    } finally {
      setDeletingProduct(null);
    }
  };

  const handleModalSuccess = () => {
    loadProducts(); // Recarregar lista após criar/editar
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadProducts}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <p className="text-gray-600 mt-2">
          Descubra nossos produtos incríveis
        </p>
        
        {isAdmin() && (
          <div className="mt-4">
            <Button onClick={handleCreateProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
        )}
      </div>

      {/* Lista de Produtos */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          {isAdmin() && (
            <Button onClick={handleCreateProduct} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Criar primeiro produto
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagem do Produto - Clicável */}
              <div 
                className="aspect-square bg-gray-200 relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleViewProduct(product)}
              >
                <img
                  src={product.imageUrl || getSmartProductImage(product.name, product.category)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, product.name, product.category)}
                />
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Últimas unidades
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded font-medium">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 
                  className="font-semibold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleViewProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="w-full space-y-2">
                  {isAuthenticated && (
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0 || addingToCart === product.id}
                      isLoading={addingToCart === product.id}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {addingToCart === product.id 
                        ? 'Adicionando...' 
                        : product.stock === 0 
                          ? 'Indisponível' 
                          : 'Adicionar ao Carrinho'
                      }
                    </Button>
                  )}
                  
                  {isAdmin() && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        disabled={deletingProduct === product.id}
                        isLoading={deletingProduct === product.id}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {deletingProduct === product.id ? '...' : 'Excluir'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Criar/Editar Produto */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        product={editingProduct}
      />

      {/* Modal de Visualização de Produto */}
      <ProductViewModal
        product={viewingProduct}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
}