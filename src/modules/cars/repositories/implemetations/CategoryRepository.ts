import { getRepository, Repository } from "typeorm";

import ICreateCategoryDTO from "../../dtos/ICreateCategoryDTO";
import Category from "../../entities/Category";
import ICategoryRepository from "../ICategoryRepository";

export default class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  // private static INSTANCE: CategoryRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoryRepository {
  //   if (!CategoryRepository.INSTANCE) {
  //     CategoryRepository.INSTANCE = new CategoryRepository();
  //   }
  //   return CategoryRepository.INSTANCE;
  // }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create();

    Object.assign(category, { name, description });

    await this.repository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  public async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}
