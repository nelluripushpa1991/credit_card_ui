export interface Card {
    id?: number;
    creditCardNumber?: string | null;
    cvv?: string;
    expiryDate: String | null;
    cardType: string;
}