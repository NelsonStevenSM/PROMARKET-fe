import { EventService } from 'src/app/shared/services/event.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, 
     private event : EventService) { }

  canActivate(
     next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //this.event.changeStyle.emit(sessionStorage.getItem("style"));
    if (sessionStorage.getItem("flagLogueo")) {
      return true;
    }
    this.router.navigate(['/authentication']);
    return false;
  }

}
