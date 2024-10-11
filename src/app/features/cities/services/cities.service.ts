import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '@features/cities/models/city.model';
import * as citiesData from "@features/cities/datas/cities.json";

@Injectable({
  providedIn: 'root',
})
export class CitiesService {

  public getCities(): Observable<City[]> {
    return of(citiesData.cities);
  }
}
