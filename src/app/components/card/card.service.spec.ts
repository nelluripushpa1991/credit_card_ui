import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { CardService } from './card.service';
import { Card } from 'primeng/card';
import { HttpClient } from '@angular/common/http';
import { visaCard, visaErrorResponse, visaInvalidCard, visaResponse } from 'src/mocks/mockCard';

describe('CardService', () => {
  let service: CardService;
  let card: Card;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  //let url = '/api/card/credit';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CardService ]
    });

    service = TestBed.inject(CardService);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have saveCard function', () => {
    expect(service.saveCard(visaCard)).toBeTruthy();
  });

  it('should call saveCard and the API should return the response object that was added', () => {
    service.saveCard(visaCard).subscribe((data) => {
      expect(data).toEqual(visaResponse);
    });
    const req = httpController.expectOne('/api/card/credit');
    expect(req.request.method).toEqual('POST');
    req.flush(visaResponse);
  });

  it('should call saveCard and the API should return the invalid response object', () => {
    service.saveCard(visaInvalidCard).subscribe((data) => {
      expect(data).toEqual(visaErrorResponse);
    });
    const req = httpController.expectOne('/api/card/credit');
    expect(req.request.method).toEqual('POST');
    req.flush(visaResponse);
  });

});
