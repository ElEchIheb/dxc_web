import { TestBed } from '@angular/core/testing';

import { RecBullService } from './rec-bull.service';

describe('RecBullService', () => {
  let service: RecBullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecBullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
