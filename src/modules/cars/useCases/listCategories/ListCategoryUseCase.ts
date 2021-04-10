import { inject, injectable } from "tsyringe";

import Category from "../../entities/Category";
import ICategoryRepository from "../../repositories/ICategoryRepository";

@injectable()
export default class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();

    return categories;
  }
}
