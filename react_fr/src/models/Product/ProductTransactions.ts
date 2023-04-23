export interface ProductTransactions{
    productId?: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productOnSale: boolean;
    productWeight: number;
    transactionsCount: number;
}