import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthFacadeService} from "./service/auth.facade";
import CookieUtil from "./util/cookie-util";

export const authorizationGuard = () => {
    const authFacadeService = inject(AuthFacadeService);
    const router = inject(Router);

    authFacadeService.getSession().subscribe(s => {
        if (!s && CookieUtil.getIdFromCookie() === '') {
            router.navigate(['/unauthorized']);
            return false;
        }

        return true;
    })
};