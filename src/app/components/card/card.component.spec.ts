import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CardComponent } from './card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should create getImageUrl', () => {
    expect(component.getImageUrl()).toBeTruthy();
  });

  it('should get cardType as VISA', () => {
    expect(component.getCardType(4)).toBe("VISA");
    // expect(component.getCardType(5)).toBe("MASTER CARD");
    // expect(component.getCardType(5)).toBe("AMERICAN EXPRESS");
    // expect(component.getCardType(1)).toBe("EMPTY");
  });

  // it('should get cardType as MASTER CARD', () => {
  //   expect(component.getCardType(5)).toBe("MASTER CARD");
  // });

  // it('should get cardType as AMERICAN EXPRESS', () => {
  //   expect(component.getCardType(5)).toBe("AMERICAN EXPRESS");
  // });

  // it('should get cardType as INVALID', () => {
  //   expect(component.getCardType(1)).toBe("EMPTY");
  // });

  
  // it('should render title in a h1 tag', () => { //6
  //   const fixture = TestBed.createComponent(CardComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('p-calender').forms.controlName).toBe('expiryDate');
  // });

  // it('should render card messages', () => {
  //   const fixture = TestBed.createComponent(CardComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.card enableService')).toBeFalse();
  // });


  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('angular-service-test-http app is running!');
  // });

  // it('should render title in a h1 tag', () => { //6
  //   const fixture = TestBed.createComponent(CardComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-component-testing!');
  // });


});
