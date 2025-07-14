import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenersComponent } from './parteners.component';

describe('PartenersComponent', () => {
  let component: PartenersComponent;
  let fixture: ComponentFixture<PartenersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartenersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartenersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
