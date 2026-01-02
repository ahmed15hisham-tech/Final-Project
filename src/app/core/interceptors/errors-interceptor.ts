import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastrService);
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      
      if (error.status===401){
        toast.error('Not Authurized')
      }
      return throwError(()=>error);
    })
  );
};
