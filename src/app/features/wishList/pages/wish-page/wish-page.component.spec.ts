import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishPageComponent } from './wish-page.component';

describe('WishPageComponent', () => {
  let component: WishPageComponent;
  let fixture: ComponentFixture<WishPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
