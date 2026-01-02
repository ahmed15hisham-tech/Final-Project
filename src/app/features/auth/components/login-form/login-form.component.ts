import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { interval, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { STORED_KEYS } from '../../../../core/constants/Stored_keys';



@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  errorMessage = ''
  SuccessMessage = ''
  isLoading = false
  redirectCounter = 3
isShowPass= false
loginForm!: FormGroup 

constructor() {
  this.initloginForm();
}

initloginForm() :void {
 this.loginForm = this.fb.group({

email : [''],
password : [''], 
});
}



submitData() :void {
  if (this.isLoading) return;
  this.loginForm.markAllAsTouched();
  this.isLoading = true
  this.errorMessage = ''
  this.SuccessMessage = ''
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.SuccessMessage ='login successfully !'
        this.isLoading = false

        const token = response.token;
        localStorage.setItem(STORED_KEYS.USER_TOKEN,token)
        this.authService.decodeToken(token);

      
        interval(1000).pipe(take(3)).subscribe(() => {
          --this.redirectCounter
          if(this.redirectCounter === 0){
            this.router.navigateByUrl('/home')
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
