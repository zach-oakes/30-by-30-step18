import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FlightHttpService} from "../service/flight-http.service";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {
    createFlight,
    createFlightSuccess, dataLoadFailure, deleteFlight, deleteFlightSuccess, loadFlight,
    loadFlights,
    loadFlightsSuccess, loadFlightSuccess,
    updateFlight,
    updateFlightSuccess
} from "../flights.actions";
import {Router} from "@angular/router";

@Injectable()
export class FlightsEffects {

    loadFlights$ = createEffect(() => this.actions$.pipe(
            ofType(loadFlights),
            exhaustMap(() => this.flightHttpService.getFlights()
                .pipe(
                    map(flights => (loadFlightsSuccess({flights}))),
                    catchError(() => of(dataLoadFailure))
                ))
        )
    );

    loadFlight$ = createEffect(() => this.actions$.pipe(
            ofType(loadFlight),
            exhaustMap(({id}) => this.flightHttpService.getFlight(id)
                .pipe(
                    map(selectedFlight => (loadFlightSuccess({selectedFlight}))),
                    catchError(() => of(dataLoadFailure))
                ))
        )
    );

    createFlight$ = createEffect(() => this.actions$.pipe(
        ofType(createFlight),
        exhaustMap((data) => this.flightHttpService.createFlight(data.flight)
            .pipe(
                map(selectedFlight => createFlightSuccess({selectedFlight})),
                catchError(() => of(dataLoadFailure))
            )
        )
    ));

    updateFlight$ = createEffect(() => this.actions$.pipe(
        ofType(updateFlight),
        exhaustMap((data) => this.flightHttpService.updateFlight(data.selectedFlight)
            .pipe(
                map(selectedFlight => updateFlightSuccess({selectedFlight})),
                catchError(() => of(dataLoadFailure))
            )
        )
    ));

    deleteFlight$ = createEffect(() => this.actions$.pipe(
        ofType(deleteFlight),
        exhaustMap(({id}) => this.flightHttpService.deleteFlight(id)
            .pipe(
                map(selectedFlight => deleteFlightSuccess({selectedFlight})),
                catchError(() => of(dataLoadFailure))
            )
        )
    ));

    dataLoadFailure$ = createEffect(() => this.actions$.pipe(
            ofType(dataLoadFailure),
            tap(() => {
                this.router.navigate(['/dataError']);
            })
        ), {dispatch: false}
    );

    constructor(private actions$: Actions,
                private flightHttpService: FlightHttpService,
                private router: Router) {
    }

}