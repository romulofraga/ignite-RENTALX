import { getRepository, Repository } from "typeorm";

import ICreateSpecificationDTO from "../../../dtos/ICreateSecificationDTO";
import ISpecificationRepository from "../../../repositories/ISpecificationRepository";
import Specification from "../entities/Specification";

export default class SpecificationRepository
  implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  public async findByIds(
    specification_ids: string[]
  ): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(specification_ids);
    return specifications;
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
    return specification;
  }

  public async list(): Promise<Specification[]> {
    const all = await this.repository.find();
    return all;
  }
}
