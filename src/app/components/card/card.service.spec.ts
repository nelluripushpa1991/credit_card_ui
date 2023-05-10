import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { CardService } from './card.service';
import { Card } from 'primeng/card';
import { HttpClient } from '@angular/common/http';
import { visaCard } from 'src/mocks/mockCard';

describe('CardService', () => {
  let service: CardService;
  let card: Card;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let url = 'http://localhost:8080/api/card/credit';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CardService ]
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have saveCard function', () => {
    expect(service.saveCard(visaCard)).toBeTruthy();
  });

  it('should call saveCard and the API should return the response object that was added', () => {
    service.saveCard(visaCard).subscribe((data) => {
      expect(data).toEqual(visaCard);
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${url}/`,
    });

    req.flush(visaCard);
  });
  

});
