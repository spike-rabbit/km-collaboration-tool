/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAdministrationService } from './user-administration.service';

describe('UserAdministrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAdministrationService]
    });
  });

  it('should ...', inject([UserAdministrationService], (service: UserAdministrationService) => {
    expect(service).toBeTruthy();
  }));
});
