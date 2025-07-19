import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingpackagesComponent } from './pricingpackages.component';

describe('PricingpackagesComponent', () => {
  let component: PricingpackagesComponent;
  let fixture: ComponentFixture<PricingpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingpackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
