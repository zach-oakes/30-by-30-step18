import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Flight} from "./model/flight";
import {inject} from "@angular/core";
import {Observable, of} from "rxjs";
import {FlightFacadeService} from "./service/flight.facade";

export const FlightResolver: ResolveFn<Flight> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    flightFacade: FlightFacadeService = inject(FlightFacadeService),
): Observable<Flight> => {
    const id = route.paramMap.get('id')!;

    // id of 'new' means we are creating a new flight. No network call should be made.
    return id === 'new' ? of({} as Flight) : flightFacade.getSelectedFlight();
};