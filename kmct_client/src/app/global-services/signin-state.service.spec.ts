/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SigninStateService } from './signin-state.service';

describe('SigninStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninStateService]
    });
  });

  it('should ...', inject([SigninStateService], (service: SigninStateService) => {
    expect(service).toBeTruthy();
  }));
});
