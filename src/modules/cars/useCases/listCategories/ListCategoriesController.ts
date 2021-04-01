import { Request, Response } from "express";

import CategoryRepository from "../../repositories/CategoryRepository";

class ListCategoriesController {
  constructor(private categoryRepository: CategoryRepository) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.categoryRepository.list();

    return response.json(categories);
  }
}

const categoryRepository = new CategoryRepository();
const listCategoriesController = new ListCategoriesController(
  categoryRepository
);

export default listCategoriesController;
