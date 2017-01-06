/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { XchangeCenterService } from './xchange-center.service';

describe('XchangeCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XchangeCenterService]
    });
  });

  it('should ...', inject([XchangeCenterService], (service: XchangeCenterService) => {
    expect(service).toBeTruthy();
  }));
});
