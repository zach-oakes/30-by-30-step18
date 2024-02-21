import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth-state";

export const authFeatureSelector = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    authFeatureSelector,
    (state: AuthState) => state.isAuthenticated
);

export const selectExistingUser = createSelector(
    authFeatureSelector,
    (state: AuthState) => state.existingUser
);

export const selectSession = createSelector(
    authFeatureSelector,
    (state: AuthState) => state.session
);

export const selectLoggedInUser = createSelector(
    authFeatureSelector,
    (state: AuthState) => state.loggedInUser
);


