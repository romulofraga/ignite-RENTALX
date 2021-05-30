import "reflect-metadata";
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateCarUseCase from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("should be able to create a car with availability", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toStrictEqual(true);
  });

  it("should not be able to create a car with exists license_plate", async () => {
    await createCarUseCase.execute({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "name car",
        description: "Description car",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-123",
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
