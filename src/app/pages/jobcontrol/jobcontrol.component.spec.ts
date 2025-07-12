import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcontrolComponent } from './jobcontrol.component';

describe('JobcontrolComponent', () => {
  let component: JobcontrolComponent;
  let fixture: ComponentFixture<JobcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobcontrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
