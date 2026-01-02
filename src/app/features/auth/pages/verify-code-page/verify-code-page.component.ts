import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { STORED_KEYS } from '../../../../core/constants/Stored_keys';


@Component({
  selector: 'app-verify-code-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code-page.component.html',
  styleUrl: './verify-code-page.component.css',
})
export class VerifyCodePageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = false;
  apiError = '';

  form = new FormGroup({
    email: new FormControl<string>(localStorage.getItem('reset_email') ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    newPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  private passwordsMatch(): boolean {
    return this.form.controls.newPassword.value === this.form.controls.confirmPassword.value;
  }

  submit(): void {
    this.apiError = '';

    if (this.form.invalid || !this.passwordsMatch()) {
      this.form.markAllAsTouched();
      if (!this.passwordsMatch()) this.apiError = 'Passwords do not match';
      return;
    }

    this.isLoading = true;

    const email = this.form.controls.email.value.trim();
    const newPassword = this.form.controls.newPassword.value;

    this.auth.resetPassword(email, newPassword).subscribe({
  next: (response: any) => {
  const token = response.token;

  localStorage.setItem(STORED_KEYS.USER_TOKEN, token);
  this.auth.decodeToken(token);

  localStorage.removeItem('reset_email');
  this.router.navigateByUrl('/home');
}
,
      error: (err) => {
        this.apiError = err?.error?.message || 'Failed to reset password';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
