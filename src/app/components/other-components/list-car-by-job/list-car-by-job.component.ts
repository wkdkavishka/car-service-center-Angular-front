import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { Car } from '../../../models/car';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-list-car-by-job',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, NgStyle],
  templateUrl: './list-car-by-job.component.html',
  styleUrl: './list-car-by-job.component.scss',
})
export class ListCarByJobComponent implements OnInit {
  @Output()
  returnCar: EventEmitter<Car> = new EventEmitter<Car>();
  // @ViewChild('dropdown', { static: true }) dropdownRef!: ElementRef;

  cars: Car[] = [];
  found_cars: Car[] = []; // to temporary hold
  // for data binding
  job_progress = -1; //
  job_status: boolean | null = null;
  isProgressDropdownOpen = false; //
  isStatusDropdownOpen = false;
  car_numberplate = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService
      .AllCars()
      .then((r) => (this.cars = r))
      .catch((err) => console.log(err));
  }

  // Close dropdown when clicking outside
  // @HostListener('document:click', ['$event'])
  // clickOutside(event: Event) {
  //   if (this.isStatusDropdownOpen && !this.dropdownRef.nativeElement.contains(event.target)) {
  //     this.isStatusDropdownOpen = false;
  //   }
  // }

  toggleDropdownProgress() {
    this.isProgressDropdownOpen = !this.isProgressDropdownOpen;
  }

  setJobProgress(progress: number): void {
    this.job_progress = progress;
    this.isProgressDropdownOpen = false; // Close the dropdown after selection
    console.log('Selected Job Progress:', this.job_progress); // Handle the status as needed
  }

  onFind(): void {
    this.found_cars = [];
    this.cars.forEach((car: Car) => {
      if (this.job_progress != -1) {
        if (this.job_progress === car.job_progress) {
          this.found_cars.push(car);
        }
      }
      if (this.car_numberplate) {
        if (this.car_numberplate === car.car_numberplate) {
          this.found_cars.push(car);
        }
      }
      if (this.job_status != null) {
        if (this.job_status == car.job_status) {
          this.found_cars.push(car);
        }
      }
    });
    this.found_cars = this.carService.findAndRemoveDuplicateCars(
      this.found_cars,
    );
  }

  refresh() {
    this.onFind();
  }

  selectReturnCar(car: Car): void {
    this.returnCar.emit(car); // Emit the selected car
  }

  setJobStatus(b: boolean | null) {
    this.job_status = b;
    this.isStatusDropdownOpen = false;
    console.log(this.job_status);
  }

  toggleDropdownStatus() {
    this.isStatusDropdownOpen = !this.isStatusDropdownOpen;
  }
}
