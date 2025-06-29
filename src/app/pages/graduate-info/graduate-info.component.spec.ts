import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateInfoComponent } from './graduate-info.component';

describe('GraduateInfoComponent', () => {
  let component: GraduateInfoComponent;
  let fixture: ComponentFixture<GraduateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
