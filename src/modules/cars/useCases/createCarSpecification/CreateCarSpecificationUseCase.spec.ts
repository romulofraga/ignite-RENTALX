import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should be able to create a new car specification", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123",
      brand: "Brand",
      category_id: "category",
    });

    await specificationRepositoryInMemory.create({
      name: "teste",
      description: "teste",
    });

    const specification = await specificationRepositoryInMemory.findByName(
      "teste"
    );

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id],
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBeGreaterThan(0);
  });

  it("should be not able to create a new car specification when car_id not exists", async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: "123123",
        specifications_ids: ["123123"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
