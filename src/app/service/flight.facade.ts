import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";
import {select, Store} from "@ngrx/store";
import {createFlight, deleteFlight, loadFlight, loadFlights, updateFlight} from "../flights.actions";
import {selectAllFlights, selectFlight} from "../flights.selectors";

@Injectable({
    providedIn: 'root'
})

export class FlightFacadeService {

    constructor(private store: Store) {}

    getFlightList(): Observable<Flight[]> {
        return this.store.pipe(select(selectAllFlights));
    }

    getSelectedFlight(): Observable<Flight> {
        return this.store.pipe(select(selectFlight));
    }

    createFlight(flight: Flight): void {
        this.store.dispatch(createFlight({ flight }));
    }

    getFlights(): void {
        this.store.dispatch(loadFlights());
    }

    getFlight(id: string): void {
        this.store.dispatch(loadFlight({ id }));
    }

    updateFlight(selectedFlight: Flight): void {
        this.store.dispatch(updateFlight({ selectedFlight }));
    }

    deleteFlight(id: string): void {
        this.store.dispatch(deleteFlight({ id }));
    }
}