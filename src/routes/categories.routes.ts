import { Router } from "express";

import CategoryRepository from "../repositories/CategoryRepository";

const categoryRepository = new CategoryRepository();

const categoriesRoutes = Router();

categoriesRoutes.post("/", async (request, response) => {
  const { name, description } = request.body;

  await categoryRepository.create({ name, description });

  return response.status(201).send();
});

export { categoriesRoutes };
