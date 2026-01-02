import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEYS } from '../constants/Stored_keys';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const platform = inject(PLATFORM_ID);

   if(isPlatformBrowser(platform)){
         const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);

      if(token){
      return router.parseUrl('/home')
     }
   }
     return true
};
