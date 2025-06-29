import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateprofileComponent } from './graduateprofile.component';

describe('GraduateprofileComponent', () => {
  let component: GraduateprofileComponent;
  let fixture: ComponentFixture<GraduateprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
