export interface TransactionIdDTO {
    transactionId?: number;
    transactionDate: Date;
    transactionQuantity: number;
    clientDTO?: number;
    productDTO?: number;
}