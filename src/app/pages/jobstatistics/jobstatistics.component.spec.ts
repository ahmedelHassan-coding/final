import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobstatisticsComponent } from './jobstatistics.component';

describe('JobstatisticsComponent', () => {
  let component: JobstatisticsComponent;
  let fixture: ComponentFixture<JobstatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobstatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
