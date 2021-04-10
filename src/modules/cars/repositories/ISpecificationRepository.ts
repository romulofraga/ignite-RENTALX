import ICreateSpecificationDTO from "../dtos/ICreateSecificationDTO";
import Specification from "../entities/Specification";

export default interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}
