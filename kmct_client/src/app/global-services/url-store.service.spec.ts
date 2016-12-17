/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UrlStoreService } from './url-store.service';

describe('UrlStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlStoreService]
    });
  });

  it('should ...', inject([UrlStoreService], (service: UrlStoreService) => {
    expect(service).toBeTruthy();
  }));
});
