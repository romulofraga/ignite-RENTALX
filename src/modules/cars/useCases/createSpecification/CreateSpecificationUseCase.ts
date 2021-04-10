import { inject, injectable } from "tsyringe";

import ISpecificationRepository from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationRepository.create({ name, description });
  }
}
