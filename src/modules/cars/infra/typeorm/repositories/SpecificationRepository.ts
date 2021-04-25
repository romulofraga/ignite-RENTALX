import { getRepository, Repository } from "typeorm";

import ICreateSpecificationDTO from "../../../dtos/ICreateSecificationDTO";
import ISpecificationRepository from "../../../repositories/ISpecificationRepository";
import Specification from "../entities/Specification";

export default class SpecificationRepository
  implements ISpecificationRepository {
  private repository: Repository<Specification>;

  // private static INSTANCE: SpecificationRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // public static getInstance(): SpecificationRepository {
  //   if (!SpecificationRepository.INSTANCE) {
  //     SpecificationRepository.INSTANCE = new SpecificationRepository();
  //   }
  //   return SpecificationRepository.INSTANCE;
  // }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create();

    Object.assign(specification, { name, description });

    await this.repository.save(specification);
  }

  public async list(): Promise<Specification[]> {
    const all = await this.repository.find();

    return all;
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}
