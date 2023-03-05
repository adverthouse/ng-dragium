import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDirectionOnlyComponent } from './one-direction-only.component';

describe('OneDirectionOnlyComponent', () => {
  let component: OneDirectionOnlyComponent;
  let fixture: ComponentFixture<OneDirectionOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDirectionOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDirectionOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
