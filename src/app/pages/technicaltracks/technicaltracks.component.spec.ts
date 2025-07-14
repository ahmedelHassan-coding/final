import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicaltracksComponent } from './technicaltracks.component';

describe('TechnicaltracksComponent', () => {
  let component: TechnicaltracksComponent;
  let fixture: ComponentFixture<TechnicaltracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicaltracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicaltracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
