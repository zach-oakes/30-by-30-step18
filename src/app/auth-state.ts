import {User} from "./model/user";
import {Session} from "./model/session";
import {createReducer, on} from "@ngrx/store";
import {
    createSession,
    createUser,
    deleteSession,
    getExistingUser,
    setAuthenticatedFlag,
    setLoggedInUser
} from "./auth-actions";
import {v4} from "uuid";

export interface AuthState {
    isAuthenticated: boolean,
    loggedInUser?: User,
    userAccounts: User[],
    existingUser?: User,
    session?: Session,
}

export const initialState: AuthState = {
    isAuthenticated: false,
    loggedInUser: undefined,
    userAccounts: [],
    existingUser: undefined,
    session: undefined,
}

export const authReducer = createReducer<AuthState>(
    initialState,
    on(createUser, (state, {username, password}) => {
        const id = v4();
        const user: User = { id, username, password };
        sessionStorage.setItem(username, password);

        return {
            ...state,
            userAccounts: [...state.userAccounts, user],
        };
    }),
    on(getExistingUser, (state, {user}) => {
        let _user = state
            .userAccounts
            .find(account => account.username === user.username && account.password === user.password);

        if (_user) {
            return { ...state, existingUser: _user}
        } else {
            const sessionPwd = sessionStorage.getItem(user.username);
             if (sessionPwd && sessionPwd === user.password) {
                 _user = { username: user.username, password: sessionPwd};
             } else {
                 _user = undefined;
             }
        }

        return { ...state, existingUser: _user};
    }),
    on(createSession, (state, {session}) => {
        sessionStorage.setItem(session.id, JSON.stringify(session));

        return { ...state, session };
    }),
    on(deleteSession, (state, {id}) => {
        sessionStorage.removeItem(id);

        return { ...state, session: undefined };
    }),
    on(setAuthenticatedFlag, (state, {isAuthenticated}) => {

        if (!isAuthenticated) {
            sessionStorage.setItem('username', '');
            return { ...state, isAuthenticated, loggedInUser: undefined };
        }

        return { ...state, isAuthenticated };
    }),
    on(setLoggedInUser, (state, {user}) => {
        return { ...state, loggedInUser: user};
    })
);
