import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, NgForOf, CarDetailsComponent],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss',
})
export class AddCarComponent implements OnInit {
  @ViewChild('carInput') carInput!: ElementRef;

  // for two-way binding
  owner = '';
  car_model = '';
  car_numberplate = '';

  // cars: Array<{ brand: string; model: string; numberplate: string }> = [];
  cars: Car[] = [];

  constructor(
    private carService: CarService, // service injector
  ) {
    this.carService.AllCars().then((r) => (this.cars = r));
    // console.log("constructor called"); // testing ################
  }

  ngOnInit() {
    // Set focus on the input element when the component is initialized
    setTimeout(() => {
      this.carInput.nativeElement.focus();
    }, 0); // delay of 0 ms
  }

  onSubmit() {
    // Create a newCar object
    const newCar: Car = {
      _id: 'fake id',
      owner: this.owner,
      car_model: this.car_model,
      car_numberplate: this.car_numberplate,
      job_status: true, // by default
      job_progress: 0, // by default
    };

    // this.cars seems to be sync with carService's cars list
    // add car to the service
    this.carService
      .addACar(newCar)
      .then
      // r => this.carService.cars.push(r)
      ();

    // clear fields after submit
    this.owner = '';
    this.car_model = '';
    this.car_numberplate = '';
    // Set focus to the input element
    this.carInput.nativeElement.focus();
  }
}
