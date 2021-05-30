import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import IRentalsRepository from "../IRentalsRepository";

export default class RentalRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  public async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => id === rental.id);
  }
  public async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => user_id === rental.user_id);
  }

  public async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
}
