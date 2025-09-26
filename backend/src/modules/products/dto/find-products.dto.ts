// backend/src/modules/products/dto/find-products.dto.ts

export class FindProductsDto {
  page?: number = 1;
  limit?: number = 10;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyActive?: boolean = true;
}