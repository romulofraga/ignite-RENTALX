import { inject, injectable } from "tsyringe";

import Specification from "../../infra/typeorm/entities/Specification";
import ISpecificationRepository from "../../repositories/ISpecificationRepository";

@injectable()
export default class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}
