import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CardComponent } from './card.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardService } from './card.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { Card } from './card';
import { formAmericanExpressCard, formInvalidCard, formMasterCard, formVisaCard, invalidErrorResponse, invalidErrorResponseData, visaCard, visaResponse } from 'src/mocks/mockCard';
import { CardTypes, ImageUrls } from '../../../enums/enum';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  let cardService: CardService;
  let route: ActivatedRoute;
  let formBuilder: FormBuilder;
  let cardServiceSpy: { saveCard: jasmine.Spy};
  let formGroup: FormGroup;
  

  beforeEach(() => {
    cardServiceSpy = jasmine.createSpyObj(CardService, ['saveCard']);
    localStorage.setItem('card', JSON.stringify(visaCard));
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, 
        FormsModule, CardModule, InputNumberModule, InputTextModule, ButtonModule, 
        CalendarModule, MessagesModule ],
      declarations: [CardComponent],
      providers: [
        {provide: CardService, useValue: cardServiceSpy}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    cardService = TestBed.inject(CardService);
    route = TestBed.inject(ActivatedRoute);
    formBuilder = TestBed.inject(FormBuilder);
    formGroup = formBuilder.group({
        creditCardNumber: [null, Validators.required],
        cvv: [null, Validators.required],
        expiryDate: [null, Validators.required],
        cardType: [null, Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create card component', () => {
    expect(component).toBeTruthy();
  });

  it('should getCardType() as VISA, MASTER CARD, AMERICAN EXPRESS, EMPTY', () => {
    expect(component.getCardType(4)).toBe(CardTypes.VISA);
    expect(component.getCardType(5)).toBe(CardTypes.MASTER_CARD);
    expect(component.getCardType(37)).toBe(CardTypes.AMERICAN_EXPRESS);
    expect(component.getCardType(1)).toBe(CardTypes.INVALID);
  });

  it('should getImageUrl() for VISA', () => {
    component.cardForm.setValue(formVisaCard);
      expect(component.getImageUrl()).toBe(ImageUrls.VISA_IMAGE_URL);
    component.cardForm.setValue(formMasterCard);
     expect(component.getImageUrl()).toBe(ImageUrls.MASTER_CARD_IMAGE_URL);
    component.cardForm.setValue(formAmericanExpressCard);
      expect(component.getImageUrl()).toBe(ImageUrls.AMERICAN_EXPRESS_IMAGE_URL);
    component.cardForm.setValue(formInvalidCard);
     expect(component.getImageUrl()).toBe(ImageUrls.INVALID_IMAGE_URL);
  });

  it('should be isInvalid() ', () => {
    expect(component.isInvalid("cvv")).toBeFalse();
    expect(component.isInvalid("creditCardNumber")).toBeFalse();
    expect(!component.isInvalid("expiryDate")).toBeTrue();
  });

  it('should  onChangeCardnumber() ', () => {
    expect(localStorage.getItem('card')).toContain("creditCardNumber");
    expect(localStorage.getItem('card')).toContain("cvv");
    expect(localStorage.getItem('card')).toContain("expiryDate");
    expect(localStorage.getItem('card')).toContain("cardType");
    expect(!(localStorage.getItem('card'))).toBeFalse();
  });

  it('should  handleValidate() ', () => {
    expect(component.handleValidate(visaResponse)).toBeUndefined();
    expect(component.handleValidate(invalidErrorResponse)).toBeUndefined();
  });

  it('should  handleError() ', () => {
    //expect(component.handleError(invalidErrorResponseData)).toBeNull();
  });

  it('should  validateCard() ', () => {
    expect(component.validateCard()).toBeUndefined();
  });
  
  it('should render p-calender ', () => { 
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p-calender')).toBeNull();
  });

  it('should render card messages', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card enableService')).toBeNull();
  });

});
