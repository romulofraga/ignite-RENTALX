import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/provider/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("DayJsDateProvider") private dayJsDateProvider: IDateProvider
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimumDaily = 1;

    if (!rental) {
      throw new AppError("Rental not found");
    }

    const dateNow = this.dayJsDateProvider.dateNow();

    let daily = this.dayJsDateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dayJsDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
