import { Component, inject, Signal } from '@angular/core';
import { CitiesService } from '@features/cities/services/cities.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { City } from '@features/cities/models/city.model';
import { CityCardComponent } from '@features/cities/components/city-card/city-card.component';
import { CitiesStore } from '@features/cities/store/bookings.store';
import { tap } from "rxjs/operators";
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrl: 'cities.page.scss',
  standalone: true,
  imports: [ CommonModule, CityCardComponent, MatSlider, MatSliderThumb, ReactiveFormsModule ],
})
export class CitiesPage {
  private citiesService = inject(CitiesService);
  protected readonly citiesStore = inject(CitiesStore);

  public cities: Signal<City[] | undefined> = toSignal(this.citiesService.getCities()
    .pipe(tap(cities => this.citiesStore.updateCities(cities))));

  public residentControl = new FormControl(this.citiesStore.filterResidentNumber())

  constructor() {
    this.residentControl.valueChanges.subscribe(interval => {
      if (interval) this.citiesStore.updateFilterResidentNumber(interval);
    });
  }
}
