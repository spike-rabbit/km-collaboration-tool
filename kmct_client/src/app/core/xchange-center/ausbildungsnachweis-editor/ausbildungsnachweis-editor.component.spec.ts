/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AusbildungsnachweisEditorComponent } from './ausbildungsnachweis-editor.component';

describe('AusbildungsnachweisEditorComponent', () => {
  let component: AusbildungsnachweisEditorComponent;
  let fixture: ComponentFixture<AusbildungsnachweisEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusbildungsnachweisEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusbildungsnachweisEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
