import { Injectable } from '@angular/core';
import { Car } from '../../models/car';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  /**
   * Searches for a specific car in an array of cars and removes it if found.
   *
   * @param {Car} car - The car object to be deleted. This object should have an `_id` property used for comparison.
   * @param {Car[]} cars - The array of car objects where the function will search for the car to be deleted.
   */
  findAndDeleteCar(car: Car, cars: Car[]): void {
    for (let i = 0; i < cars.length; i++) {
      if (car._id == cars[i]._id) {
        cars.splice(i, 1);
        break;
      }
    }
  }
}
