import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { interval, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
 private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

  errorMessage = ''
  SuccessMessage = ''
  isLoading = false
  redirectCounter = 3
  registerForm !: FormGroup
constructor(){
  this.initRegisterForm();
}


  initRegisterForm():void {
     this.registerForm = this.fb.group({
    name: ['',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),]],
    email: ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
    rePassword : ['',[Validators.required,Validators.pattern(/^[A-Z][a-z][0-9]{8,}$/)]],
    phone : ['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators: this.passwordMatch }
);
  }


passwordMatch( registerForm:AbstractControl){
  const password = registerForm.get('password')?.value;
  const rePassword = registerForm.get('rePassword')?.value;

  if (password === rePassword) {
    return null

} else {
    return { passwordMatch: true };
}}


submitData() :void {
  if (this.isLoading) return;
  this.registerForm.markAllAsTouched();
  this.isLoading = true
  this.errorMessage = ''
  this.SuccessMessage = ''
  if (this.registerForm.valid) {
    this.authService.signup(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.SuccessMessage ='Account created successfully !'
        this.isLoading = false
        interval(1000).pipe(take(3)).subscribe(() => {
          --this.redirectCounter
          if(this.redirectCounter === 0){
            this.router.navigateByUrl('/login')
          }
        });
      },
      error: (error:HttpErrorResponse) => {
       this.errorMessage = error.error.message
        this.isLoading = false
      }
    });
  }
  }
}
