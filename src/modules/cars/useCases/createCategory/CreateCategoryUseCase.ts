import ICategoryRepository from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }
    this.categoryRepository.create({ name, description });
  }
}
