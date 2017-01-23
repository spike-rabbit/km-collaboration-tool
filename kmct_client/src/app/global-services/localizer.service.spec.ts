/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalizerService } from './localizer.service';

describe('LocalizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizerService]
    });
  });

  it('should ...', inject([LocalizerService], (service: LocalizerService) => {
    expect(service).toBeTruthy();
  }));
});
