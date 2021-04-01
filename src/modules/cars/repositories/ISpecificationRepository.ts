import ICreateSpecificationDTO from "../dtos/ICreateSecificationDTO";

export default interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}
