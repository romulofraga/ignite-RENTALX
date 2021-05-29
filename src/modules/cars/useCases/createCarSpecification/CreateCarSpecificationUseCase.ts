import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ISpecificationRepository from "@modules/cars/repositories/ISpecificationRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

@injectable()
export default class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute({ car_id, specifications_ids }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);
    if (!car) {
      throw new AppError("Car not found");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_ids
    );

    if (specifications.length <= 0) {
      throw new AppError("specifications not found");
    }

    car.specifications = specifications;

    await this.carsRepository.create(car);
    return car;
  }
}
