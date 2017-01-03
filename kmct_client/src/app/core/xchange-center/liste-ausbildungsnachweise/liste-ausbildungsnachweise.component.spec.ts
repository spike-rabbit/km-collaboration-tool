/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListeAusbildungsnachweiseComponent } from './liste-ausbildungsnachweise.component';

describe('ListeAusbildungsnachweiseComponent', () => {
  let component: ListeAusbildungsnachweiseComponent;
  let fixture: ComponentFixture<ListeAusbildungsnachweiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAusbildungsnachweiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAusbildungsnachweiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
