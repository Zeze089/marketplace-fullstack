// backend/src/modules/products/dto/update-product.dto.ts

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  category?: string;
  isActive?: boolean;
}