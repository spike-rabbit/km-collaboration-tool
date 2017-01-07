/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageClassesComponent } from './manage-classes.component';

describe('ManageClassesComponent', () => {
  let component: ManageClassesComponent;
  let fixture: ComponentFixture<ManageClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
