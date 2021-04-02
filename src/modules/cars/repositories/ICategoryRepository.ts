import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../model/Category";

export default interface ICategoryRepository {
  list(): Category[];
  findByName(name: string): Category;
  create({ name, description }: ICreateCategoryDTO): void;
}
