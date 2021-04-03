import { Request, Response } from "express";

import ListSpecificationUseCase from "./ListSpecificationUseCase";

export default class ListSpecificationsController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

  public handle(request: Request, response: Response): Response {
    const specifications = this.listSpecificationUseCase.execute();

    return response.json(specifications);
  }
}
