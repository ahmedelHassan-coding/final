import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutgtsComponent } from './aboutgts.component';

describe('AboutgtsComponent', () => {
  let component: AboutgtsComponent;
  let fixture: ComponentFixture<AboutgtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutgtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutgtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
