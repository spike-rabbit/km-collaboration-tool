/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XchangeMarketComponent } from './xchange-market.component';

describe('XchangeMarketComponent', () => {
  let component: XchangeMarketComponent;
  let fixture: ComponentFixture<XchangeMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XchangeMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XchangeMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
