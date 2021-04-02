import { Router } from "express";

import SpecificationRepository from "../modules/cars/repositories/implemetations/SpecificationRepository";
import CreateSpecificationService from "../modules/cars/services/CreateSpecificationService";

const specificationRepository = new SpecificationRepository();

const specificationsRouter = Router();

specificationsRouter.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecification = new CreateSpecificationService(
    specificationRepository
  );

  createSpecification.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRouter };
