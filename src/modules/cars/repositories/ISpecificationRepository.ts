import ICreateSpecificationDTO from "../DTOS/ICreateSecificationDTO";

export default interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}
