import { Request, Response } from "express";

import ListCategoriesUseCase from "./ListCategoryUseCase";

export default class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  public handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
