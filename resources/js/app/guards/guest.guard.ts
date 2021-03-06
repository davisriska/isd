import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isLoggedIn()) {
            return true;
        } else {
            if (this.authService.isLoggedIn()) {
                this.router.navigate(['/']);
            }

            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isLoggedIn()) {
            return true;
        } else {
            if (this.authService.isLoggedIn()) {
                this.router.navigate(['/']);
            }

            return false;
        }
    }

}
