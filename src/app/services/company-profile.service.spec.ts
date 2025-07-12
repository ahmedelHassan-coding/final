import { TestBed } from '@angular/core/testing';

import { CompanyProfileService } from '../services/company-profile.service';

describe('CompanyProfileService', () => {
  let service: CompanyProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
