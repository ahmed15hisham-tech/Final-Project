import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodePageComponent } from './verify-code-page.component';

describe('VerifyCodePageComponent', () => {
  let component: VerifyCodePageComponent;
  let fixture: ComponentFixture<VerifyCodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyCodePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
