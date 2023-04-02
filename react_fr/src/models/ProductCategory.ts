import { CategoryDTO } from "./categoryDTO";

export interface ProductCategory{
    productId?: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productOnSale: boolean;
    productWeight: number;
    categoryDTO: CategoryDTO;
}