/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassLeaderGuardService } from './class-leader.service';

describe('ClassLeaderGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassLeaderGuardService]
    });
  });

  it('should ...', inject([ClassLeaderGuardService], (service: ClassLeaderGuardService) => {
    expect(service).toBeTruthy();
  }));
});
