import { Component, Input, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle, FormsModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent implements OnInit {
  // @ViewChild('jobStatus') carInput!: ElementRef;
  cars: Car[] = [];

  @Input()
  givenCar!: Car; // The selected car from all-cars component

  // for data binding
  isStatusDropdownOpen = false; //
  isProgressDropdownOpen = false; //
  selectedTab = 'stats'; // default tab

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Check if givenCar is undefined or null and set default values
    if (!this.givenCar) {
      this.givenCar = {
        owner: 'Default Owner',
        car_model: 'Default Model',
        car_numberplate: 'XXX-0000',
        _id: '-1',
        job_status: false, // Default to false (e.g., closed)
        job_progress: -1, // Default to 0 (e.g., no progress)
      };
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  selectTabMobile(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTab = target.value;
  }

  onDelete() {
    this.carService.deleteACar(this.givenCar).then();
  }

  onUpdate() {
    // todo -> fix this messy update // stop replacing
    console.log('given car before ', this.givenCar);
    this.carService
      .updateACar(this.givenCar)
      .then((r) => {
        console.log('r->', r);
        this.givenCar = r;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleDropdownStatus(): void {
    this.isStatusDropdownOpen = !this.isStatusDropdownOpen;
  }

  setJobStatus(status: boolean): void {
    this.givenCar.job_status = status;
    this.isStatusDropdownOpen = false; // Close the dropdown after selection
    console.log('Selected Job Status:', this.givenCar.job_status); // Handle the status as needed
  }

  toggleDropdownProgress() {
    this.isProgressDropdownOpen = !this.isProgressDropdownOpen;
  }

  setJobProgress(progress: number): void {
    this.givenCar.job_progress = progress;
    this.isProgressDropdownOpen = false; // Close the dropdown after selection
    console.log('Selected Job Progress:', this.givenCar.job_progress); // Handle the status as needed
  }

  // Single implementation
  getTotalCars(status?: boolean): number {
    if (status === undefined) {
      return this.carService.cars.length;
    } else {
      return this.carService.cars.filter((car) => car.job_status === status)
        .length;
    }
  }
}
