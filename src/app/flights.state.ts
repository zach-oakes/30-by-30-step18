import {createReducer, on} from "@ngrx/store";
import {Flight} from "./model/flight";
import {
    createFlightSuccess,
    deleteFlightSuccess,
    loadFlightsSuccess,
    loadFlightSuccess,
    updateFlightSuccess
} from "./flights.actions";

export interface FlightsState {
    flights: Flight[],
    selectedFlight: Flight,
}

export const initialState: FlightsState = {
    flights: [],
    selectedFlight: {} as Flight,
};

export const flightsReducer = createReducer<FlightsState>(
    initialState,
    on(loadFlightsSuccess, (state, {flights}) => ({...state, flights})),
    on(loadFlightSuccess, (state, {selectedFlight}) => ({...state, selectedFlight})),
    on(createFlightSuccess, (state, {selectedFlight}) => ({...state, selectedFlight: {} as Flight})),
    on(updateFlightSuccess, (state, {selectedFlight}) => {
        const flights = [...state.flights];
        flights.map(flight => flight.id === state.selectedFlight.id ? state.selectedFlight : flight);

        return {
            ...state,
            flights,
            selectedFlight
        };
    }),
    on(deleteFlightSuccess, (state, {selectedFlight}) => {
        const flights = [...state.flights];
        flights.filter(flight => flight.id !== state.selectedFlight.id);

        return {
            ...state,
            flights,
            selectedFlight
        };
    })
);