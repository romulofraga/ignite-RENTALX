import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import ICategoryRepository from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }
    await this.categoryRepository.create({ name, description });
  }
}
