import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-verify-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-page.component.html',
  styleUrl: './verify-page.component.css',
})
export class VerifyPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = false;
  apiError = '';

  form = new FormGroup({
    resetCode: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
  });

  submit(): void {
    this.apiError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const code = this.form.controls.resetCode.value.trim();

    this.auth.verifyResetCode(code).subscribe({
      next: () => {
        this.router.navigateByUrl('/verify-code');
      },
      error: (err) => {
        this.apiError = err?.error?.message || 'Invalid code';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
