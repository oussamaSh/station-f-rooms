import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateReservationComponent } from './validate-reservation.component';

describe('ValidateReservationComponent', () => {
  let component: ValidateReservationComponent;
  let fixture: ComponentFixture<ValidateReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
