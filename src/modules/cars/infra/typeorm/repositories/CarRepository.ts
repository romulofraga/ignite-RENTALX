import { Repository, getRepository } from "typeorm";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

import Car from "../entities/Car";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });

    return car;
  }

  public async findAllAvaiable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("cars.name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }
}
