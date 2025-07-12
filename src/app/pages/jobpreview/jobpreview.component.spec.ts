import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpreviewComponent } from './jobpreview.component';

describe('JobpreviewComponent', () => {
  let component: JobpreviewComponent;
  let fixture: ComponentFixture<JobpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobpreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
