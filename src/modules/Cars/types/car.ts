export type CarFormFields = {
  id?: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
};

export type Car = {
  carId: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
};
