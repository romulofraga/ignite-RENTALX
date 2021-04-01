import Category from "../../model/Category";
import ICategoryRepository from "../../repositories/ICategoryRepository";

export default class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();

    return categories;
  }
}
