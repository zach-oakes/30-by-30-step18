import {FlightsState} from "./flights.state";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const flightsFeatureSelector = createFeatureSelector<FlightsState>('flights');

export const selectAllFlights = createSelector(
    flightsFeatureSelector,
    (state: FlightsState) => state.flights
);

export const selectFlight = createSelector(
    flightsFeatureSelector,
    (state: FlightsState) => state.selectedFlight
);