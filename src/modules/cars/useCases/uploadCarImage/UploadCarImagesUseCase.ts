import { inject, injectable } from "tsyringe";

import ICarsImagesRepository from "@modules/cars/repositories/ICarsImagesRepository";
import IStorageProvider from "@shared/container/provider/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
export default class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImageRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}
