import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriticComponent } from './add-critic.component';

describe('AddCriticComponent', () => {
  let component: AddCriticComponent;
  let fixture: ComponentFixture<AddCriticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCriticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
