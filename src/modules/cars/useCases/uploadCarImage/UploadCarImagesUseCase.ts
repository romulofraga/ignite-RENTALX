import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/file";

import ICarsImagesRepository from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
  replaceAll?: string;
}
@injectable()
export default class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImageRepository: ICarsImagesRepository
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carImageRepository.findById(car_id);

    carImages.map(async (carImage) => {
      await deleteFile(carImage.image_name);
    });

    images_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image);
    });
  }
}
