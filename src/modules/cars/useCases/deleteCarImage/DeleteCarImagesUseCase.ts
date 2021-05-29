import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/file";

import ICarsImagesRepository from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  carImage_id: string;
}
@injectable()
export default class DeleteCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImageRepository: ICarsImagesRepository
  ) {}

  public async execute({ carImage_id }: IRequest): Promise<void> {
    const carImages = await this.carImageRepository.findById(carImage_id);

    carImages.map(async (carImage) => {
      await deleteFile(carImage.image_name);
    });

    carImages.map(async (image) => {
      await this.carImageRepository.deleteCarImages(image.id);
    });
  }
}
