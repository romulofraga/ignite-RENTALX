import ICreateSpecificationDTO from "../dtos/ICreateSecificationDTO";
import Specification from "../model/Specification";

export default interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
