import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSecificationDTO";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

import ISpecificationRepository from "../ISpecificationRepository";

export default class SpecificationRepositoryInMemory
  implements ISpecificationRepository {
  specifications: Specification[] = [];

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  public async list(): Promise<Specification[]> {
    return this.specifications;
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => name === specification.name
    );

    return specification;
  }

  public async findByIds(
    specification_ids: string[]
  ): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      specification_ids.includes(specification.id)
    );

    return allSpecifications;
  }
}
