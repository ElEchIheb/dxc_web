import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcComponent } from './add-proc.component';

describe('AddProcComponent', () => {
  let component: AddProcComponent;
  let fixture: ComponentFixture<AddProcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
