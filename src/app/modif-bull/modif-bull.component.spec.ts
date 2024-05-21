import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifBullComponent } from './modif-bull.component';

describe('ModifBullComponent', () => {
  let component: ModifBullComponent;
  let fixture: ComponentFixture<ModifBullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifBullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifBullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
