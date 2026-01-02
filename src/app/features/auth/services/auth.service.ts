import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { IAuthRespose } from '../interfaces/IAuthRespose';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { STORED_KEYS } from '../../../core/constants/Stored_keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  private readonly router = inject(Router)

  login(userData:{}){
  return this.http.post<IAuthRespose>('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }
  
  signup(userData:{}){
   return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
  }
 logout(){
  localStorage.clear();
  this.router.navigateByUrl('/login');
 }
   decodeToken(token: string): boolean |void {
  try{
    const userId = (jwtDecode(token) as {id:string})?.id;
    localStorage.setItem(STORED_KEYS.USER_ID, userId);
    return true;
  }catch{
    this.logout();
  }
  }

forgotPassword(email: string) {
  return this.http.post(
    'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
    { email }
  );
}

verifyResetCode(resetCode: string) {
  return this.http.post(
    'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
    { resetCode }
  );
}

resetPassword(email: string, newPassword: string) {
  return this.http.put(
    'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
    { email, newPassword }
  );
}

}
  