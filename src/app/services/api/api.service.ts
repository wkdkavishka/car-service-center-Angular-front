import { Injectable } from '@angular/core';
import { Car, SerializedCar } from '../../models/car';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /*
  This Service is only to Communicate with the API of car-service express back
  This Service Ensure Correct Type
   */

  // todo -> use .env or sth better
  private baseUrl = environment.apiUrl; // api path

  constructor(private http: HttpClient) {}

  // Method to GET All the cars
  fetchAllCars(): Observable<Car[]> {
    const url = `${this.baseUrl}`;
    return this.http
      .get<SerializedCar[]>(url)
      .pipe(
        map((cars: SerializedCar[]) =>
          cars.map((car: SerializedCar) => this.castCar(car)),
        ),
      );
  }

  // Method to GET A car
  fetchACar(car: Car): Observable<Car> {
    const url = `${this.baseUrl}${car._id}`;
    return this.http
      .get<SerializedCar>(url)
      .pipe(map((car: SerializedCar) => this.castCar(car)));
  }

  // Method to ADD A Car
  postACar(car: Car): Observable<Car> {
    const url = `${this.baseUrl}`; // Your API endpoint
    const newCar = this.serializeCar(car);
    return this.http
      .post<SerializedCar>(url, newCar)
      .pipe(map((car: SerializedCar) => this.castCar(car)));
  }

  // Method to Delete A Car
  deleteACar(car: Car): Observable<Car> {
    const url = `${this.baseUrl}${car._id}`;
    return this.http
      .delete<SerializedCar>(url)
      .pipe(map((car: SerializedCar) => this.castCar(car)));
  }

  // Method to Update A Car
  patchACar(car: Car): Observable<Car> {
    const url = `${this.baseUrl}${car._id}`;
    const newCar = this.serializeCar(car);
    console.log('patchACar', newCar);
    return this.http
      .patch<SerializedCar>(url, newCar)
      .pipe(map((car: SerializedCar) => this.castCar(car)));
  }

  //   ###############################################################

  // DAO - Pattern
  // Method to ensure the received object conforms to the Car interface
  private castCar(data: SerializedCar): Car {
    console.log(
      'castCar :',
      typeof Boolean(data.job_status),
      ' value ',
      Boolean(data.job_status),
    );
    return {
      owner: data.owner || 'Unknown Owner',
      car_model: data.car_model || 'Unknown Model',
      car_numberplate: data.car_numberplate || 'N/A',
      job_status: data.job_status === 'true',
      job_progress:
        typeof data.job_progress === 'number' ? data.job_progress : 0,
      _id: data._id || '',
    };
  }

  // DTO - Pattern
  private serializeCar(car: Car): SerializedCar {
    return {
      owner: car.owner,
      car_model: car.car_model,
      car_numberplate: car.car_numberplate,
      job_status: car.job_status.toString(),
      job_progress: car.job_progress.toString(),
      _id: car._id,
    };
  }
}
