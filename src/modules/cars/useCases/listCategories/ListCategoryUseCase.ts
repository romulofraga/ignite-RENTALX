import Category from "../../model/Category";
import ICategoryRepository from "../../repositories/ICategoryRepository";

export default class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public execute(): Category[] {
    const categories = this.categoryRepository.list();

    return categories;
  }
}
