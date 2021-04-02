import ICreateSpecificationDTO from "../dtos/ICreateSecificationDTO";
import Specification from "../model/Specification";

export default interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
  list(): Specification[];
}
