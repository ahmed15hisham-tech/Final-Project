import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { STORED_KEYS } from '../constants/Stored_keys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  if (!req.urlWithParams.includes('cart') &&!req.urlWithParams.includes('orders')) return next(req);

  const PLATFORMId = inject(PLATFORM_ID)

  if(isPlatformBrowser(PLATFORMId)){
    const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);


    if(token){
      req = req.clone({
        setHeaders:{
          token: token,
        }
      })
    }
  }

  return next(req);
};
