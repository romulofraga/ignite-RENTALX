import dayjs from "dayjs";

import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import DayJsDateProvider from "@shared/container/provider/DateProvider/implementations/DayJsDateProvider";
import AppError from "@shared/errors/AppError";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayJsProvider = new DayJsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider
    );
  });

  it("should be able to create a new Rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123123",
      car_id: "123123",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be not able to create a new Rental if the user already in rental car in the same time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123123",
        car_id: "123123",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "123123",
        car_id: "123123",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new Rental when the same car is already in rent", async () => {
    await createRentalUseCase.execute({
      user_id: "123123",
      car_id: "test",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321321",
        car_id: "test",
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
