import { TestBed } from '@angular/core/testing';

import { OpenedCardsService } from './opened-cards.service';

describe('OpenedCardsService', () => {
  let service: OpenedCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenedCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
