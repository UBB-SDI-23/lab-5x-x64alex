import { CategoryDTO } from "./CategoryDTO";

export interface ProductCategory{
    productId?: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productOnSale: boolean;
    productWeight: number;
    productDescription: string;
}