/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmDeleteInvitationComponent } from './confirm-delete-invitation.component';

describe('ConfirmDeleteInvitationComponent', () => {
  let component: ConfirmDeleteInvitationComponent;
  let fixture: ComponentFixture<ConfirmDeleteInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
