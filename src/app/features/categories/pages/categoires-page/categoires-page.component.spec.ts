import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoiresPageComponent } from './categoires-page.component';

describe('CategoiresPageComponent', () => {
  let component: CategoiresPageComponent;
  let fixture: ComponentFixture<CategoiresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoiresPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoiresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
