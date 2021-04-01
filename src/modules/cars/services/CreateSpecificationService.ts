import ISpecificationRepository from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CategoryRepositoryService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name
    );

    if (!specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationRepository.create({ name, description });
  }
}
