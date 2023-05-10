import { Card } from "src/app/components/card/card";

const visaCard: Card = {
    id: 1,
    creditCardNumber: "411111111111111",
    cvv: "141",
    expiryDate: "05/2024",
    cardType: "VISA"
}

const masterCard: Card = {
    id: 2,
    creditCardNumber: "511111111111111",
    cvv: "151",
    expiryDate: "05/2025",
    cardType: "MASTER CARD"
}

const americanExpressCard: Card = {
    id: 2,
    creditCardNumber: "3711111111111111",
    cvv: "137",
    expiryDate: "05/2026",
    cardType: "AMERICAN EXPRESS"
}

const listOfCards: Card[] = [visaCard,masterCard,americanExpressCard];
export { visaCard, masterCard, americanExpressCard }