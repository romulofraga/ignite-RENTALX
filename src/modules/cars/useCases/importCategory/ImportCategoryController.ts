import { Request, Response } from "express";
import { container } from "tsyringe";

import ImportCategoryUseCase from "./ImportCategoryUseCase";

export default class ImportCategoryController {
  public handle(request: Request, response: Response): Response {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}
