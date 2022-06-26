import { TestBed } from '@angular/core/testing';

import { UserDetailsService } from './userdetails.service';

describe('UserdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDetailsService = TestBed.get(UserDetailsService);
    expect(service).toBeTruthy();
  });
});
