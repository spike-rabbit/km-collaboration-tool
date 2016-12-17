/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KmctHttpService } from './kmct-http.service';

describe('KmctHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KmctHttpService]
    });
  });

  it('should ...', inject([KmctHttpService], (service: KmctHttpService) => {
    expect(service).toBeTruthy();
  }));
});
