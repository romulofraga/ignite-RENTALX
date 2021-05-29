import ICreateSpecificationDTO from "../dtos/ICreateSecificationDTO";
import Specification from "../infra/typeorm/entities/Specification";

export default interface ISpecificationRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(specification_ids: string[]): Promise<Specification[]>;
  list(): Promise<Specification[]>;
}
