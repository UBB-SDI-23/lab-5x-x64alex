import { ClientDTO } from "../Client/ClientDTO";
import { Product } from "../Product/Product";

export interface TransactionDTO {
    transactionId: number;
    transactionDate: Date;
    transactionQuantity: number;
    clientDTO: ClientDTO;
    productDTO: Product;
}