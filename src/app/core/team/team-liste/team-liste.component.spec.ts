import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListeComponent } from './team-liste.component';

describe('TeamListeComponent', () => {
  let component: TeamListeComponent;
  let fixture: ComponentFixture<TeamListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
