import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexperincesComponent } from './editexperinces.component';

describe('EditexperincesComponent', () => {
  let component: EditexperincesComponent;
  let fixture: ComponentFixture<EditexperincesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditexperincesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditexperincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
