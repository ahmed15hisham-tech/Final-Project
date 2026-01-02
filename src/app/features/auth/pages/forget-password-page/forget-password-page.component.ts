import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forget-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password-page.component.html',
  styleUrl: './forget-password-page.component.css',
})
export class ForgetPasswordPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = false;
  apiError = '';

  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  submit(): void {
    this.apiError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const email = this.form.controls.email.value.trim();

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        localStorage.setItem('reset_email', email); 
        this.router.navigateByUrl('/verify');
      },
      error: (err) => {
        this.apiError = err?.error?.message || 'Failed to send code';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
