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
  }: ICreateSpecificationDTO): Promise<void> { }
}
