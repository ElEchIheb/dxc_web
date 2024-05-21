import { TestBed } from '@angular/core/testing';

import { ProcService } from './poste.service';

describe('ProcService', () => {
  let service: ProcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
