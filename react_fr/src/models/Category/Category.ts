import { Product } from "../Product/Product";

export interface Category {
    categoryId: number;
    categoryName: string;
    categoryPopularity: number;
    categorySales: number;
    categoryReturnsPerMonth: number;
    categoryProfitability: number;
}