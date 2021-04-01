import { Request, Response } from "express";

import CategoryRepository from "../../repositories/CategoryRepository";
import ListCategoriesUseCase from "./ListCategoryUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
const categoryRepository = new CategoryRepository();
const listCategories = new ListCategoriesUseCase(categoryRepository);
const listCategoriesController = new ListCategoriesController(listCategories);

export default listCategoriesController;
