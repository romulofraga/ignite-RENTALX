import ICreateSpecificationDTO from "../dtos/ICreateSecificationDTO";
import Specification from "../model/Specification";
import ISpecificationRepository from "./ISpecificationRepository";

export default class SpecificationRepository
  implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
  }

  // public async list(): Promise<Specification[]> {
  //   return this.specifications;
  // }

  public async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
