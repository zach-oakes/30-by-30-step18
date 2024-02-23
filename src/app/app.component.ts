import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import CookieUtil from "./util/cookie-util";
import {AuthFacadeService} from "./service/auth.facade";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Flight Tracker';
    isAuthenticated$: Observable<boolean>;
    authenticated: boolean = false;

    constructor(private authFacadeService: AuthFacadeService, private router: Router) {

        this.isAuthenticated$ = authFacadeService.getIsAuthenticated();
        this.isAuthenticated$
            .subscribe(authenticated => this.authenticated = authenticated);
    }

    logout(): void {
        const id = CookieUtil.getIdFromCookie();

        if (id !== '') {
            // wipe the cookie and the kill the session
            CookieUtil.wipeCookie();
            this.authFacadeService.deleteSession(id);
        }

        this.authFacadeService.setIsAuthenticated(false);
        this.router.navigate(['/login'])
            .then(() => {
                location.reload();
            });
    }

    hasCookie(): boolean {
        return CookieUtil.getIdFromCookie() !== '';
    }
}
