import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { City } from '@features/cities/models/city.model';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CitiesStore } from '@features/cities/store/bookings.store';
import { RESIDENT_DECREASE_NUMBER, RESIDENT_INCREASE_NUMBER } from '@app/shared/constants';

@Component({
  selector: 'app-city-card',
  template: `
    <mat-card class="city-card" appearance="outlined">
      <mat-card-header>
        <div mat-card-avatar class="header-image" [style.background-image]="avatarStyle()"></div>
        <mat-card-title>{{ city().CityName }}</mat-card-title>
        <mat-card-subtitle>{{ city().Nation }}</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image [src]="city().CityImage" alt="Photo of a Shiba Inu">
      <mat-card-content class="mt-3">
        <p>{{ city().Description }}</p>
        <p class="font-semibold">Population: {{ city().Population | number:'1.0-1' }}</p>
      </mat-card-content>
      <mat-card-actions>
        <div class="flex justify-content-between w-full">
          <button mat-button (click)="decrease()">Nuke</button>
          <button mat-button (click)="increase()">Grow</button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: 'city-card.component.scss',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButton ],
})
export class CityCardComponent {
  public city: InputSignal<City> = input.required<City>();
  protected readonly citiesStore = inject(CitiesStore);

  public avatarStyle = computed(() => `url('${ this.city().NationFlag }')`);

  public decrease(): void {
    const remainingResidents = this.city().Population - RESIDENT_DECREASE_NUMBER;
    this.city().Population = remainingResidents < 0 ? 0 : remainingResidents;
    this.citiesStore.updateCity(this.city());
  }

  public increase(): void {
    this.city().Population += RESIDENT_INCREASE_NUMBER;
    this.citiesStore.updateCity(this.city());
  }
}
