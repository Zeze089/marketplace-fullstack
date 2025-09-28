// frontend/src/utils/productImages.ts

interface ImageMapping {
  keywords: string[];
  imageUrl: string;
}

const productImageMappings: ImageMapping[] = [
  // Smartphones
  {
    keywords: ['iphone', 'smartphone', 'celular', 'galaxy', 'android'],
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
  },
  
  // Laptops/Notebooks
  {
    keywords: ['macbook', 'laptop', 'notebook', 'ultrabook', 'dell', 'lenovo'],
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop'
  },
  
  // Cameras
  {
    keywords: ['camera', 'ptz', 'fotografia', 'canon', 'nikon', 'sony'],
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop'
  },
  
  // Fones de Ouvido
  {
    keywords: ['airpods', 'fone', 'headphone', 'earphone', 'audio'],
    imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'
  },
  
  // Tablets
  {
    keywords: ['ipad', 'tablet', 'surface'],
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop'
  },
  
  // Consoles de Video Game
  {
    keywords: ['playstation', 'xbox', 'nintendo', 'switch', 'console', 'game'],
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop'
  },
  
  // Monitores
  {
    keywords: ['monitor', 'display', 'tela', 'ultrawide'],
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop'
  },
  
  // Teclados
  {
    keywords: ['teclado', 'keyboard', 'mecânico', 'keychron'],
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop'
  },
  
  // Mouse
  {
    keywords: ['mouse', 'rato'],
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
  },
  
  // Smartwatches
  {
    keywords: ['apple watch', 'smartwatch', 'relógio'],
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop'
  },
  
  // Carregadores
  {
    keywords: ['carregador', 'cabo', 'charger', 'usb'],
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop'
  },
  
  // Impressoras
  {
    keywords: ['impressora', 'printer', 'multifuncional'],
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop'
  },
  
  // Roteadores
  {
    keywords: ['roteador', 'router', 'wifi', 'modem'],
    imageUrl: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&h=500&fit=crop'
  },
  
  // SSDs/HDs
  {
    keywords: ['ssd', 'hd', 'armazenamento', 'storage'],
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16c?w=500&h=500&fit=crop'
  },
  
  // Placas de Vídeo
  {
    keywords: ['placa de vídeo', 'gpu', 'nvidia', 'amd', 'rtx', 'gtx'],
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop'
  }
];

// Imagem padrão genérica para produtos sem match
const defaultProductImage = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop';

export function getSmartProductImage(productName: string, category?: string): string {
  const searchText = `${productName} ${category || ''}`.toLowerCase();
  
  // Procurar por palavras-chave no nome do produto
  for (const mapping of productImageMappings) {
    for (const keyword of mapping.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return mapping.imageUrl;
      }
    }
  }
  
  // Se não encontrar match específico, retornar imagem padrão
  return defaultProductImage;
}

// Função para ser usada nos componentes como fallback
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>, 
  productName: string, 
  category?: string
): void {
  const target = event.target as HTMLImageElement;
  const smartImage = getSmartProductImage(productName, category);
  
  // Se a imagem inteligente também falhar, usar a padrão
  if (target.src !== smartImage) {
    target.src = smartImage;
  } else {
    target.src = defaultProductImage;
  }
}