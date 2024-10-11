import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { City } from '@features/cities/models/city.model';
import { computed } from '@angular/core';

type CitiesState = {
  cities: City[];
  filterResidentNumber: number;
};

const initialState: CitiesState = {
  cities: [],
  filterResidentNumber: 0
};

export const CitiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ cities, filterResidentNumber }) => ({
      citiesFiltered: computed(() => {
        return cities().filter((city) => city.Population >= filterResidentNumber())
      })
    })
  ),
  withMethods((store) => ({
      updateCities(cities: City[]): void {
        patchState(store, () => ({ cities }));
      },
      updateCity(city: City): void {
        const cities = store.cities().map(c => c.CityName === city.CityName ? city : c);
        patchState(store, () => ({ cities }));
      },
      updateFilterResidentNumber(filterResidentNumber: number): void {
        patchState(store, () => ({ filterResidentNumber }));
      }
    })
  )
);
