import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../model/Category";

export default interface ICategoryRepository {
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
