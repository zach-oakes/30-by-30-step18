import {Component} from '@angular/core';
import {v4} from "uuid";
import {Session} from "../model/session";
import CookieUtil from "../util/cookie-util";
import {AuthFacadeService} from "../service/auth.facade";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/user";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
    hidePassword = true;
    username = '';
    password = '';
    loginFailed = false;

    private existingUser$: Observable<User | undefined>;
    private account: User | undefined = undefined;

    constructor(private authFacadeService: AuthFacadeService, private router: Router) {
        this.existingUser$ = this.authFacadeService.selectExistingUser();
        this.existingUser$.subscribe(u => this.account = u);
    }

    login(): void {
        this.loginFailed = false;

        this.authFacadeService.getExistingUser({ username: this.username, password: this.password });

        // If user does not exist that means they haven't created their Account yet. Fail the login.
        if (!this.account) {
            this.loginFailed = true;
            return;
        }

        this.authFacadeService.setLoggedInUser(this.account);

        // Create session and store cookie
        const id = v4();
        const session: Session = {id, username: this.username, createTimestamp: new Date().toUTCString()};
        this.authFacadeService.createSession(session);

        CookieUtil.createCookie(id);
        this.authFacadeService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
    }

    get isDisabled(): boolean {
        return this.username === '' ||
            this.username === undefined ||
            this.password === '' ||
            this.password === undefined;
    }
}

