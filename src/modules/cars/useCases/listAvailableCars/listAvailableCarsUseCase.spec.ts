import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import ListAvailableCarsUseCase from "./listAvailableCarsUseCase";

let carsRepository: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepository.create({
      name: "teste 2",
      description: "teste 2",
      daily_rate: 1,
      fine_amount: 1,
      license_plate: "teste 2",
      brand: "teste 2",
      category_id: "0c1ab87a-0036-44f7-8745-95e49b33bdad",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepository.create({
      name: "teste 2",
      description: "teste 2",
      daily_rate: 1,
      fine_amount: 1,
      license_plate: "teste 2",
      brand: "teste 2",
      category_id: "0c1ab87a-0036-44f7-8745-95e49b33bdad",
    });

    const cars = await listCarsUseCase.execute({
      name: "teste 2",
    });

    expect(cars).toEqual([car1]);
  });

  it("shoud be able to list all avaialble cars by brand", async () => {
    const car1 = await carsRepository.create({
      name: "teste 2",
      description: "teste 2",
      daily_rate: 1,
      fine_amount: 1,
      license_plate: "teste 2",
      brand: "teste 2",
      category_id: "0c1ab87a-0036-44f7-8745-95e49b33bdad",
    });

    const cars = await listCarsUseCase.execute({
      brand: "teste 2",
    });

    expect(cars).toEqual([car1]);
  });

  it("shoud be able to list all avaialble cars by category_id", async () => {
    const car1 = await carsRepository.create({
      name: "teste 2",
      description: "teste 2",
      daily_rate: 1,
      fine_amount: 1,
      license_plate: "teste 2",
      brand: "teste 2",
      category_id: "0c1ab87a-0036-44f7-8745-95e49b33bdad",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "0c1ab87a-0036-44f7-8745-95e49b33bdad",
    });

    expect(cars).toEqual([car1]);
  });
});
