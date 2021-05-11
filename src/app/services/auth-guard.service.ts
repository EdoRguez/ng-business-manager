import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private cookieService: CookieService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot)
              : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.cookieService.get('idUser')) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }


        
}
