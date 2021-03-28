import { Router } from "express";

import CategoryRepository from "../repositories/CategoryRepository";
import CategoryRepositoryService from "../services/CreateCategoryService";

const categoryRepository = new CategoryRepository();

const categoriesRouter = Router();

categoriesRouter.post("/", async (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CategoryRepositoryService(categoryRepository);

  createCategory.execute({ name, description });

  return response.status(201).send();
});
categoriesRouter.get("/list", async (request, response) => {
  const categories = await categoryRepository.list();

  return response.json(categories);
});

export { categoriesRouter };
