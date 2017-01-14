/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KnowledgeCenterService } from './knowledge-center.service';

describe('KnowledgeCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnowledgeCenterService]
    });
  });

  it('should ...', inject([KnowledgeCenterService], (service: KnowledgeCenterService) => {
    expect(service).toBeTruthy();
  }));
});
