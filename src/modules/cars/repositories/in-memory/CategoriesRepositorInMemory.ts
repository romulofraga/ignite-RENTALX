import ICreateCategoryDTO from "../../dtos/ICreateCategoryDTO";
import Category from "../../entities/Category";
import ICategoryRepository from "../ICategoryRepository";

export default class CategoryRepositorInMemory implements ICategoryRepository {
  categories: Category[] = [];

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });

    this.categories.push(category);
  }

  public async list(): Promise<Category[]> {
    const { categories } = this;
    return categories;
  }

  public async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}
