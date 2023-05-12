import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Card } from './card';
import { CardService } from './card.service';
import { Message } from 'primeng/api';
import { CardTypes, ImageUrls } from '../../../enums/enum';
import { Observable } from 'rxjs';

// this function checks wheather card number length should be between 13 and 16 digits are not
const validateCardNumber = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = String(control.value || '');
    if (!(value.length >= 13 && value.length <= 16)) {
      return { message: "Required" }
    }
    return null;
  }
}

// this function checks wheather cvv is equal to 3 or not
const validateCvv = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = String(control.value || '');
    if (value.length !== 3 ) {
      return { message: "Required" }
    }
    return null;
  }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cardForm: FormGroup = this.fb.group({
    creditCardNumber: [null,
      validateCardNumber()],
    cvv: [null, validateCvv()],
    expiryDate: [null, Validators.required],
    cardType: [null, Validators.required],
  });

  // to identify new newly entered card or not
  operationType: string | null = "new";
  messages: Message[] = [];
  imageUrl: string = ImageUrls.INVALID_IMAGE_URL;
  isShow: boolean | undefined = false;
  isShowExpiryDate: boolean | undefined = false;
  minDate: Date = new Date();


  constructor(private cardService: CardService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    // verifying and displaying card number if present in localstorage
    this.operationType = this.route.snapshot.paramMap.get('operation');
    if ('card' in localStorage) {
      this.operationType = "old";
      const oldcard: Card = JSON.parse(localStorage.getItem('card') as any);
      setTimeout(() => {
        const value: any = window.atob(oldcard.creditCardNumber ?? '');
        if ("NaN" !== value && !isNaN(value)) {
          this.cardForm.get('creditCardNumber')?.setValue(value);
          const oldCardType = this.getCardType(value);
          this.cardForm.get('cardType')?.setValue(oldCardType);
          this.imageUrl = this.getImageUrl();
        }
          
      }, 500);
    }
    setTimeout(() => {
      // handling to show required images based on number series
      this.cardForm.get('creditCardNumber')?.valueChanges.subscribe((val) => {
        this.cardForm.get('cardType')?.setValue(this.getCardType(val || -1))
        this.imageUrl = this.getImageUrl();
        this.onChangeCardnumber(val);
      });
    }, 1000);
  }

  // logic to get image path based on cardtype
  getImageUrl() {
    const cardtype: string = this.cardForm.get('cardType')?.value;
    return cardtype === CardTypes.VISA ? '../assets/visacard.png' :
      cardtype === CardTypes.MASTER_CARD ? '../assets/mastercard.jpg' :
        cardtype === CardTypes.AMERICAN_EXPRESS ? '../assets/americanexpresscard.jpeg' :
          '../assets/invalidcard.jpeg';
  }

  // logic to get cardtype based on number series
  getCardType(input: number) {
    if (input > 10) {
      const twoDigits: number = parseInt(Number(input).toString().split('').splice(0, 2).join(''));
      if (twoDigits === 37)
        return CardTypes.AMERICAN_EXPRESS;
    }
    const firstDigit: number = input > 10 ? parseInt(input.toString().charAt(0)) : input;
    return firstDigit === 4 ? CardTypes.VISA : firstDigit === 5 ? CardTypes.MASTER_CARD : CardTypes.INVALID;
  }

  // logic to store card number into localstorage to diaply the same value after refresh also
  onChangeCardnumber(event: any) {
    const oldcard: Card = JSON.parse(localStorage.getItem('card') ?? '{}' as any);
    oldcard.creditCardNumber = window.btoa(event);
    localStorage.setItem('card', JSON.stringify(oldcard));
  }

  // logic to display appropriate message based success response
  handleValidate(response: any) {
    if (response != null && response != "") {
      if (!isNaN(response.id)) {
        this.messages = [{ severity: 'success', summary: 'Success', detail: "Credit Card is Valid" }];
      } 
    }
  }

  // logic to display appropriate message based error response
  handleError(errorResponse: any) {
    if (errorResponse !== null && errorResponse !== "") {
      this.messages = [{ severity: 'error', summary: 'Error', detail: errorResponse.error.message }];
    }
  }


  isInvalid(controlName: string): boolean | undefined {
    const status = (this.cardForm.get(controlName)?.status === 'INVALID' && this.cardForm.get(controlName)?.touched);
    if(controlName !== "expiryDate") {
      this.isShow = status;
    } else {
      this.isShowExpiryDate = status
    }
    return status;
  }

  // logic to connect with server
  validateCard() {
    if (this.cardForm.valid) {
      this.cardService.saveCard(this.cardForm.getRawValue() as Card).subscribe({
        next: this.handleValidate.bind(this),
        error: this.handleError.bind(this)
      });
    } else {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please Enter Valid Data' }];
    }
  }
}


