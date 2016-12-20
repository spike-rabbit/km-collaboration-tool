/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AusbildungsnachweisComponent } from './ausbildungsnachweis.component';

describe('AusbildungsnachweisComponent', () => {
  let component: AusbildungsnachweisComponent;
  let fixture: ComponentFixture<AusbildungsnachweisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusbildungsnachweisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusbildungsnachweisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
