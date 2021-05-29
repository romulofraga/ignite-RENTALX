import { getRepository, Repository } from "typeorm";

import ICarsImagesRepository from "@modules/cars/repositories/ICarsImagesRepository";

import CarImage from "../entities/CarImage";

export default class CarsImageRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  public async findById(id: string): Promise<CarImage[]> {
    const carImages = await this.repository.find({ id });

    return carImages;
  }
  public async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }

  public async deleteCarImages(carImage_id: string): Promise<void> {
    await this.repository.delete({ id: carImage_id });
  }
}
