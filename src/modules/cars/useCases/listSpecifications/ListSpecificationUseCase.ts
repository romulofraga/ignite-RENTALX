import Specification from "../../model/Specification";
import ISpecificationRepository from "../../repositories/ISpecificationRepository";

export default class ListCategoriesUseCase {
  constructor(private spacificationRepository: ISpecificationRepository) {}

  public execute(): Specification[] {
    const specifications = this.spacificationRepository.list();

    return specifications;
  }
}
