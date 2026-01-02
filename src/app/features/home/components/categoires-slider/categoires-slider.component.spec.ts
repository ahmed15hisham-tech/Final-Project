import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoiresSliderComponent } from './categoires-slider.component';

describe('CategoiresSliderComponent', () => {
  let component: CategoiresSliderComponent;
  let fixture: ComponentFixture<CategoiresSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoiresSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoiresSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
