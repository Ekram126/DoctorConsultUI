import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoggedUser } from '../../models/userVM';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    AuthorizedRoles;
    user: LoggedUser;
    public currentUser: LoggedUser;
    constructor(private router: Router,
        private authenticationService: AuthenticationService,) { }



    canActivate(): boolean {
        if (this.authenticationService.userData.getValue() != null) {
           // const requiredRoles = router.data.roles as Array<string>;

            return true;
        }
        else {
            this.router.navigate(['/'])
            return false;
        }
    }


    // canActivate(route: ActivatedRouteSnapshot): boolean {
    //     const user = this.authenticationService.userData.getValue();
    //     const requiredRoles = route.data.roles as Array<string>;
    
    //     if (user && this.hasRequiredRole(user.roles, requiredRoles)) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/']);
    //       return false;
    //     }
    //   }
    

    // private hasRequiredRole(userRoles: Array<string>, requiredRoles: Array<string>): boolean {
    //     return requiredRoles.every(role => userRoles.includes(role));
    //   }
}
