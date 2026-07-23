export interface IProvider {
  name: string;
  description: string;
  brand?: string;
  image?: string;
  pricePerDay: number;
  stock: number;
  categoryId: string;
}