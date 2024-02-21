import {Injectable} from "@angular/core";
import { Observable} from "rxjs";
import {User} from "../model/user";
import {Session} from "../model/session";
import {select, Store} from "@ngrx/store";
import {
    createSession,
    createUser,
    deleteSession,
    getExistingUser,
    setAuthenticatedFlag,
    setLoggedInUser,
} from "../auth-actions";
import {selectExistingUser, selectIsAuthenticated, selectLoggedInUser, selectSession} from "../auth.selectors";

@Injectable({
    providedIn: 'root'
})

export class AuthFacadeService {

    constructor(private store: Store) {}

    getIsAuthenticated(): Observable<boolean> {
        return this.store.pipe(select(selectIsAuthenticated));
    }

    setIsAuthenticated(isAuthenticated: boolean): void {
        this.store.dispatch(setAuthenticatedFlag({isAuthenticated}));
    }

    getLoggedInUser(): Observable<User | undefined> {
        return this.store.pipe(select(selectLoggedInUser));
    }

    setLoggedInUser(user: User): void {
        this.store.dispatch(setLoggedInUser({user}));
    }

    createUser(username: string, password: string): void {
        this.store.dispatch(createUser({username, password}));
    }

    getExistingUser(user: User): void{
        this.store.dispatch(getExistingUser({user}));
    }

    selectExistingUser(): Observable<User | undefined> {
        return this.store.pipe(select(selectExistingUser));
    }

    createSession(session: Session): void {
        this.store.dispatch(createSession({session}));
    }

    getSession(): Observable<Session | undefined> {
        return this.store.pipe(select(selectSession));
    }

    deleteSession(id: string): void {
        this.store.dispatch(deleteSession({id}));
    }
}