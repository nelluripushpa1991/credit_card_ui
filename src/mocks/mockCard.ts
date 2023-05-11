import { FormGroup } from "@angular/forms";
import { Card } from "src/app/components/card/card";

const visaCard: Card = {
    id: 1,
    creditCardNumber: "411111111111111",
    cvv: "141",
    expiryDate: "05/2024",
    cardType: "VISA"
}

const visaInvalidCard: Card = {
    id: 4,
    creditCardNumber: "41111",
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

const masterInvaliCard: Card = {
    id: 5,
    creditCardNumber: "5111",
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

const americanExpressInvalidCard: Card = {
    id: 6,
    creditCardNumber: "3711",
    cvv: "137",
    expiryDate: "05/2026",
    cardType: "AMERICAN EXPRESS"
}

const invalidCard: Card = {
    id: 6,
    creditCardNumber: "111111111",
    cvv: "137",
    expiryDate: "05/2026",
    cardType: "EMPTY"
}

const visaResponse = {
    cardType: "VISA",
    message: "VALID"
}
const masterCardResponse = {
    cardType: "MASTER CARD",
    message: "VALID"
}
const americanExpressResponse = {
    cardType: "AMERICAN EXPRESS",
    message: "VALID"
}

const visaErrorResponse = {
    cardType: "VISA",
    message: "VALID"
}
const masterCardErrorResponse = {
    cardType: "MASTER CARD",
    message: "VALID"
}
const americanExpressErrorResponse = {
    cardType: "AMERICAN EXPRESS",
    message: "VALID"
}

const invalidErrorResponse = {
    cardType: "Invalid Input",
    message: "INVALID"
}

const invalidErrorResponseData = {
    cardType: "Invalid Input",
    error: {
        message: "INVALID"
    }
}

const formVisaCard = {
    creditCardNumber: "411111111111111",
    cvv: 141,
    expiryDate: "05/2025",
    cardType: "VISA"
 }
const formMasterCard = {
    creditCardNumber: "511111111111111",
    cvv: 151,
    expiryDate: "05/2025",
    cardType: "MASTER CARD"
 } 
 const formAmericanExpressCard = {
    creditCardNumber: "3711111111111111",
    cvv: 131,
    expiryDate: "05/2025",
    cardType: "AMERICAN EXPRESS"
 } 
 const formInvalidCard = {
    creditCardNumber: "111111111111111",
    cvv: 141,
    expiryDate: "05/2025",
    cardType: "EMPTY"
 } 



const listOfCards: Card[] = [visaCard,masterCard,americanExpressCard, invalidCard];
export { visaCard, masterCard, americanExpressCard, invalidCard, 
    visaResponse, masterCardResponse, americanExpressResponse, 
    visaInvalidCard, masterInvaliCard, americanExpressInvalidCard, 
    visaErrorResponse, masterCardErrorResponse, invalidErrorResponseData,
    americanExpressErrorResponse, invalidErrorResponse, formVisaCard, formMasterCard, formAmericanExpressCard, formInvalidCard }