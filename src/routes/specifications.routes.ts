import { Router } from "express";

import SpecificationRepository from "../modules/cars/repositories/SpecificationRepository";
import CreateSpecificationService from "../modules/cars/services/CreateSpecificationService";

const specificationRepository = new SpecificationRepository();

const specificationsRouter = Router();

specificationsRouter.post("/", async (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CreateSpecificationService(
    specificationRepository
  );

  createCategory.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRouter };
