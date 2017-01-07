/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PopupsService } from './popups.service';

describe('PopupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupsService]
    });
  });

  it('should ...', inject([PopupsService], (service: PopupsService) => {
    expect(service).toBeTruthy();
  }));
});
