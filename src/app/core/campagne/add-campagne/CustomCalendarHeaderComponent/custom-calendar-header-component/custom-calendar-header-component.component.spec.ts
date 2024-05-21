import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalendarHeaderComponentComponent } from './custom-calendar-header-component.component';

describe('CustomCalendarHeaderComponentComponent', () => {
  let component: CustomCalendarHeaderComponentComponent;
  let fixture: ComponentFixture<CustomCalendarHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCalendarHeaderComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalendarHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
