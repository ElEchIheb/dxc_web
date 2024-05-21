import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecBullComponent } from './rec-bull.component';

describe('RecBullComponent', () => {
  let component: RecBullComponent;
  let fixture: ComponentFixture<RecBullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecBullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecBullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
