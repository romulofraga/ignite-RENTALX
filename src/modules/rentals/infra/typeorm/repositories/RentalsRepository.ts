import { getRepository, Repository } from "typeorm";

import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCar = await this.repository.findOne({ car_id });
    return rentalByCar;
  }
  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUser = await this.repository.findOne({ user_id });
    return rentalByUser;
  }
  public async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
}
