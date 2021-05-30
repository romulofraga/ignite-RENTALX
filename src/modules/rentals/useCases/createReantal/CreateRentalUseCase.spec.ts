import dayjs from "dayjs";

import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import DayJsDateProvider from "@shared/container/provider/DateProvider/implementations/DayJsDateProvider";
import AppError from "@shared/errors/AppError";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dayJsProvider = new DayJsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new Rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    await usersRepositoryInMemory.create({
      name: "test",
      email: "test",
      password: "test",
      driver_license: "test",
    });

    const user = await usersRepositoryInMemory.findByEmail("test");

    const rental = await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be not able to create a new Rental if the user already in rental car in the same time", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    await usersRepositoryInMemory.create({
      name: "test",
      email: "test",
      password: "test",
      driver_license: "test",
    });

    const user = await usersRepositoryInMemory.findByEmail("test");

    await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: user.id,
        car_id: car2.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new Rental when the same car is already in rent", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    await usersRepositoryInMemory.create({
      name: "test",
      email: "test",
      password: "test",
      driver_license: "test",
    });

    await usersRepositoryInMemory.create({
      name: "test",
      email: "test2",
      password: "test",
      driver_license: "test2",
    });

    const user = await usersRepositoryInMemory.findByEmail("test");
    const user2 = await usersRepositoryInMemory.findByEmail("test");

    await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: user2.id,
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new Rental with invalid return time (< 24h)", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "321321",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
