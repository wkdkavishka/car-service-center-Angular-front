// Define the TypeScript interface for the Car document
export interface Car {
  owner: string;
  car_model: string;
  car_numberplate: string;
  job_status: boolean;
  job_progress: number;
  _id: string;
}

export interface SerializedCar {
  owner: string;
  car_model: string;
  car_numberplate: string;
  job_status: string;
  job_progress: string;
  _id: string;
}
