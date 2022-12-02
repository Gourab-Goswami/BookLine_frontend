import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticDashboardComponent } from './critic-dashboard.component';

describe('CriticDashboardComponent', () => {
  let component: CriticDashboardComponent;
  let fixture: ComponentFixture<CriticDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
