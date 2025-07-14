import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateAppliedJobsComponent } from './graduate-applied-jobs.component';

describe('GraduateAppliedJobsComponent', () => {
  let component: GraduateAppliedJobsComponent;
  let fixture: ComponentFixture<GraduateAppliedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateAppliedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateAppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
