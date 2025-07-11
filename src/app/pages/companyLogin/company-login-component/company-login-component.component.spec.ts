import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoginComponentComponent } from './company-login-component.component';

describe('CompanyLoginComponentComponent', () => {
  let component: CompanyLoginComponentComponent;
  let fixture: ComponentFixture<CompanyLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLoginComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
