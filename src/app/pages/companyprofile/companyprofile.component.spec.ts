import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyprofileComponent } from './companyprofile.component';

describe('CompanyprofileComponent', () => {
  let component: CompanyprofileComponent;
  let fixture: ComponentFixture<CompanyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
