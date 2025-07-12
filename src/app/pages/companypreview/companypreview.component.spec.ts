import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanypreviewComponent } from './companypreview.component';

describe('CompanypreviewComponent', () => {
  let component: CompanypreviewComponent;
  let fixture: ComponentFixture<CompanypreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanypreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanypreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
