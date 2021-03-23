import Category from "../routes/model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }
}
