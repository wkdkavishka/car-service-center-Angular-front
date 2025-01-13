import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  fetched = false;
  cars: Car[] = []; // and Empty Array of Car  // cars: Array<Car> = [];

  constructor(private apiService: ApiService) {
    this.initialize().then(() => console.log('Car service initialized'));
  }

  // todo -> implement -> fetch cars with limit of n

  // Refresh cars and wait until the data is fetched
  async refreshCarList(): Promise<Car[]> {
    try {
      // Fetch the cars and wait for the data to be resolved
      this.cars = await firstValueFrom(this.apiService.fetchAllCars());
      return this.cars;
    } catch (error) {
      console.error('Error refreshCarList :', error);
      throw error;
    }
  }

  async AllCars(): Promise<Car[]> {
    if (this.fetched) {
      return this.cars;
    } else {
      try {
        return (this.cars = await firstValueFrom(
          this.apiService.fetchAllCars(),
        ));
      } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
      }
    }
  }

  async addACar(car: Car): Promise<Car> {
    try {
      // ADD and return the car
      const response = await firstValueFrom(this.apiService.postACar(car));
      console.log('Car added successfully:', response);
      this.cars.push(response); // updating the local car list
      return response;
    } catch (error) {
      console.error('Error Adding car:', error);
      throw error;
    }
  }

  async updateACar(car: Car): Promise<Car> {
    try {
      // Update and return the car
      const response = await firstValueFrom(this.apiService.patchACar(car));
      console.log('Car Updated successfully:', response);
      // todo -> check if the car object get replaced or not  // fixed
      this.findAndReplaceCar(response); // updating the local car list
      return response;
    } catch (error) {
      console.error('Error Adding car:', error);
      throw error;
    }
  }

  async deleteACar(car: Car): Promise<void> {
    try {
      const d_car = await firstValueFrom(this.apiService.deleteACar(car));
      this.findAndDeleteCar(d_car);
      console.log('Car Deleted successfully:', d_car);
      // return d_car;
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }

  findAndDeleteCar(car: Car) {
    for (let i = 0; i < this.cars.length; i++) {
      if (car._id == this.cars[i]._id) {
        this.cars.splice(i, 1);
        break;
      }
    }
  }

  findAndRemoveDuplicateCars(cars: Car[]): Car[] {
    const seen: Car[] = [];
    console.log('cars length', cars.length);
    seen.push(cars[0]);
    cars.forEach((car) => {
      if (!this.carExists(seen, car._id)) {
        seen.push(car);
      }
      console.log('seen :', car);
    });
    console.log(seen);
    return seen;
  }

  // Method to initialize or refresh data
  private async initialize(): Promise<void> {
    try {
      this.cars = await firstValueFrom(this.apiService.fetchAllCars());
      this.fetched = true;
    } catch (error) {
      console.error('Error initialize cars:', error);
      throw error;
    }
  }

  private findAndReplaceCar(car: Car) {
    for (let i = 0; i < this.cars.length; i++) {
      if (car._id == this.cars[i]._id) {
        this.cars[i] = car;
        break;
      }
    }
  }

  private carExists(cars: Car[], id: string): boolean {
    if (cars == null) {
      return false;
    }
    for (let i = 0; i < this.cars.length; i++) {
      if (cars[i]?._id === id) {
        return true;
      }
    }
    return false;
  }
}
