import { getRepository, Repository } from "typeorm";

import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  public async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentals;
  }
  public async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return rentalByCar;
  }
  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return rentalByUser;
  }
  public async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
}
