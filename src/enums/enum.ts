enum CardTypes {
    VISA = "VISA",
    MASTER_CARD = "MASTER CARD",
    AMERICAN_EXPRESS = "AMERICAN EXPRESS",
    INVALID = "INVALID",
  }
  
  enum ImageUrls {
    VISA_IMAGE_URL = '../assets/visacard.png',
    MASTER_CARD_IMAGE_URL = '../assets/mastercard.jpg',
    AMERICAN_EXPRESS_IMAGE_URL = '../assets/americanexpresscard.jpeg',
    INVALID_IMAGE_URL = '../assets/invalidcard.jpeg',
  }

  export { CardTypes, ImageUrls }