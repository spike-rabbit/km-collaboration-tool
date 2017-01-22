/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedEventManagementService } from './shared-event-management.service';

describe('SharedEventManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedEventManagementService]
    });
  });

  it('should ...', inject([SharedEventManagementService], (service: SharedEventManagementService) => {
    expect(service).toBeTruthy();
  }));
});
