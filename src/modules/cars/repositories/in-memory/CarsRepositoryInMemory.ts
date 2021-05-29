import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  public async create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  public async findAllAvaiable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  public async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car_id === car.id);
  }
}
