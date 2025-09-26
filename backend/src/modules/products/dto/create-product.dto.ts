// backend/src/modules/products/dto/create-product.dto.ts

export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  category?: string;
}