import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsStadiumsComponent } from './teams-stadiums.component';

describe('TeamsStadiumsComponent', () => {
  let component: TeamsStadiumsComponent;
  let fixture: ComponentFixture<TeamsStadiumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsStadiumsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamsStadiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
