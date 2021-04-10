import { container } from "tsyringe";

import ICategoryRepository from "../../modules/cars/repositories/ICategoryRepository";
import CategoryRepository from "../../modules/cars/repositories/implemetations/CategoryRepository";
import SpecificationRepository from "../../modules/cars/repositories/implemetations/SpecificationRepository";
import ISpecificationRepository from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
