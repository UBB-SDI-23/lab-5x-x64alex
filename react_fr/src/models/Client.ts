import { Transaction } from "./Transaction";

export interface Client{
    "clientId": number;
    "clientFirstName": string;
    "clientLastName": string;
    "clientEmail": string;
    "clientAddress": string;
    "clientPhoneNumber": string;
    "transactions": Transaction[];
}