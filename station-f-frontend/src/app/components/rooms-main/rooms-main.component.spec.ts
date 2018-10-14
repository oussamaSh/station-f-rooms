import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsMainComponent } from './rooms-main.component';

describe('RoomsMainComponent', () => {
  let component: RoomsMainComponent;
  let fixture: ComponentFixture<RoomsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
