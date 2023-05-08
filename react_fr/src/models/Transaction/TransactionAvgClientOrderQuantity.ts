export interface TransactionAvgClientOrderQuantity {
    transactionId: number;
    transactionDate: Date;
    transactionQuantity: number;
    clientId: number;
    productId: number;
    avgClientOrderQuantity: number;
    userName: string;
}