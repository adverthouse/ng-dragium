import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDragComponent } from './basic-drag.component';

describe('BasicDragComponent', () => {
  let component: BasicDragComponent;
  let fixture: ComponentFixture<BasicDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
